import fs from "fs";
import https from "https";
import playwright from "playwright";

const filmsPath = "./src/baseFilms.json";

type FilmRecord = Record<string, string>;

function downloadPoster(imageUrl: string, destinationPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destinationPath);
    https
      .get(imageUrl, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", reject);
  });
}

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
    if (posterExists && "Tagline" in film && "Backdrop" in film) {
      console.log(`${film["Name"]} already has poster, tagline, and backdrop`);
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

    const backdropUrl = await page
      .$eval("[data-backdrop]", (el) => el.getAttribute("data-backdrop") ?? "")
      .catch(() => "");

    film["Backdrop"] = backdropUrl;

    const imageUrl = await page
      .$$eval(".poster.film-poster img", (images) => {
        for (const image of images) {
          const src = image.getAttribute("src") ?? "";
          if (!src || src.includes("empty-poster")) continue;
          if (src.includes("film-poster") || src.includes("ltrbxd.com/resized/")) {
            return src;
          }
        }
        return "";
      })
      .catch(() => "");

    if (!posterExists) {
      if (imageUrl) {
        console.log("Found poster for ", film["Name"], imageUrl);
        fs.mkdirSync(`./public/posters/${split[split.length - 1]}`, {
          recursive: true,
        });
        await downloadPoster(imageUrl, path);
      } else {
        console.log("No poster found for ", film["Name"]);
        noPosters.push(film["Name"]);
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
