import fs from "fs";
import https from "https";
import playwright from "playwright";
import films from "../src/baseFilms.json" assert { type: "json" };

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  const noPosters: string[] = [];

  for (let i = 0; i < films.length; i++) {
    const film = films[i];

    const split = film["Letterboxd URI"].split("/");
    const path = `./public/posters/${split[split.length - 1]}/poster.jpg`;

    console.log(`${film["Name"]} (${i + 1} of ${films.length})`);

    if (fs.existsSync(path)) {
      console.log(`${film["Name"]} already exists`);
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

    const images = await page.$$eval(
      "#js-poster-col .film-poster.poster img",
      (all_images) => {
        const image_links = [];
        all_images.forEach((image) => {
          if (
            image.src.startsWith("https://") &&
            image.src.includes("resize")
          ) {
            image_links.push(image.src);
          }
        });
        return image_links;
      }
    );

    images.forEach((imageUrl) => {
      const split = film["Letterboxd URI"].split("/");
      const path = `./public/posters/${split[split.length - 1]}/poster.jpg`;
      fs.mkdirSync(`./public/posters/${split[split.length - 1]}`, {
        recursive: true,
      });
      const file = fs.createWriteStream(path);
      https.get(imageUrl, function (response) {
        response.pipe(file);
      });
    });
    if (images.length === 0) {
      noPosters.push(film["Name"]);
    }
  }

  if (noPosters.length > 0) {
    console.log("No posters found for the following films:");
    console.log(JSON.stringify(noPosters, null, 2));
  }

  await browser.close();
})();
