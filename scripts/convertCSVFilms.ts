import csv from "csvtojson";
import fs from "fs";

const films = await csv().fromFile("./films.csv");

fs.writeFileSync("./src/baseFilms.json", JSON.stringify(films, null, 2));
