import csv from "csvtojson";
import fs from "fs";

const filmsPath = "./src/baseFilms.json";

const films = await csv().fromFile("./films.csv");

const taglineByUri: Record<string, string> = {};
if (fs.existsSync(filmsPath)) {
  const existing = JSON.parse(fs.readFileSync(filmsPath, "utf8")) as Array<
    Record<string, string>
  >;
  for (const row of existing) {
    const uri = row["Letterboxd URI"];
    const tagline = row["Tagline"];
    if (uri && tagline !== undefined) taglineByUri[uri] = tagline;
  }
}

for (const film of films) {
  const uri = film["Letterboxd URI"];
  if (uri && uri in taglineByUri) film["Tagline"] = taglineByUri[uri];
}

fs.writeFileSync(filmsPath, JSON.stringify(films, null, 2));
