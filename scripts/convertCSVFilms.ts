import csv from "csvtojson";
import fs from "fs";

const filmsPath = "./src/baseFilms.json";

const films = await csv().fromFile("./films.csv");

const csvColumns = new Set(["Date", "Name", "Year", "Letterboxd URI"]);
const enrichedByUri: Record<string, Record<string, string>> = {};

if (fs.existsSync(filmsPath)) {
  const existing = JSON.parse(fs.readFileSync(filmsPath, "utf8")) as Array<
    Record<string, string>
  >;
  for (const row of existing) {
    const uri = row["Letterboxd URI"];
    if (!uri) continue;

    const enrichedFields: Record<string, string> = {};
    for (const [fieldName, fieldValue] of Object.entries(row)) {
      if (!csvColumns.has(fieldName) && fieldValue !== undefined) {
        enrichedFields[fieldName] = fieldValue;
      }
    }

    if (Object.keys(enrichedFields).length > 0) {
      enrichedByUri[uri] = enrichedFields;
    }
  }
}

for (const film of films) {
  const uri = film["Letterboxd URI"];
  if (uri && uri in enrichedByUri) {
    Object.assign(film, enrichedByUri[uri]);
  }
}

fs.writeFileSync(filmsPath, JSON.stringify(films, null, 2));
