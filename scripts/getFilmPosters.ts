import fs from "fs";
import https from "https";
import playwright from "playwright";

const filmsPath = "./src/baseFilms.json";

type FilmRecord = Record<string, string>;

(async () => {
  const films = JSON.parse(
    fs.readFileSync(filmsPath, "utf8")
  ) as FilmRecord[];

  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  const noPosters: string[] = [];

  for (let i = 0; i < films.length; i++) {
    const film = films[i];

    const split = film["Letterboxd URI"].split("/");
    const path = `./public/posters/${split[split.length - 1]}/poster.jpg`;

    console.log(`${film["Name"]} (${i + 1} of ${films.length})`);

    const posterExists = fs.existsSync(path);
    if (posterExists && "Tagline" in film) {
      console.log(`${film["Name"]} already has poster and tagline`);
      continue;
    }

    await page.goto(film["Letterboxd URI"], {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });
    await page.waitForURL("**/film/**", {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });
    await page.waitForTimeout(3000);

    const taglineText = await page
      .$eval("h4.tagline", (el) =>
        Array.from(el.childNodes)
          .map((n) => (n.textContent ?? "").trim())
          .filter(Boolean)
          .join(" ")
          .trim()
      )
      .catch(() => "");

    film["Tagline"] = taglineText;

    const imageUrl = await page.$$eval(
      "[data-film-id][data-item-slug]",
      (elements) => {
        const trailingYear = /-(?:1[89]\d{2}|20\d{2})$/;
        for (const el of elements) {
          const filmId = el.getAttribute("data-film-id");
          const slug = el.getAttribute("data-item-slug");
          if (!filmId || !slug) continue;

          const slugForUrl = slug.replace(trailingYear, "");
          const digitPath = filmId.split("").join("/");

          return `https://a.ltrbxd.com/resized/film-poster/${digitPath}/${filmId}-${slugForUrl}-0-230-0-345-crop.jpg`;
        }
      }
    );

    if (!posterExists) {
      if (imageUrl) {
        console.log("Found poster for ", film["Name"], imageUrl);
        fs.mkdirSync(`./public/posters/${split[split.length - 1]}`, {
          recursive: true,
        });
        const file = fs.createWriteStream(path);
        https.get(imageUrl, function (response) {
          response.pipe(file);
        });
      } else {
        console.log("No poster found for ", film["Name"]);
      }
    }

    fs.writeFileSync(filmsPath, JSON.stringify(films, null, 2));
  }

  if (noPosters.length > 0) {
    console.log("No posters found for the following films:");
    console.log(JSON.stringify(noPosters, null, 2));
  }

  await browser.close();
})();
