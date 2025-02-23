import dotenv from "dotenv";
import extract from "extract-zip";
import fs from "fs";
import playwright from "playwright";

dotenv.config();

const __dirname = import.meta.dirname;

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();

  page.goto("https://letterboxd.com/data/export");

  const downloadPromise = page.waitForEvent("download");

  await page.getByLabel("username").fill(process.env.LETTERBOXD_USERNAME!);
  await page.getByLabel("password").fill(process.env.LETTERBOXD_PASSWORD!);

  await page.getByRole("button", { name: "Sign in" }).click();

  const download = await downloadPromise;
  await download.saveAs("./.temp/data.zip");

  try {
    await extract("./.temp/data.zip", {
      dir: __dirname + "/../.temp/data",
    });

    fs.copyFileSync(
      __dirname + "/../.temp/data/likes/films.csv",
      __dirname + "/../films.csv"
    );
  } catch (err) {
    console.log(err);
  }

  await browser.close();
})();
