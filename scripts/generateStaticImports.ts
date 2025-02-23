import fs from "fs";

const posterDirs = fs
  .readdirSync("public/posters")
  .filter((dir) => !dir.startsWith("."));

let staticImports = ``;

for (const posterDir of posterDirs) {
  staticImports += `import poster${posterDir} from "../public/posters/${posterDir}/poster.jpg";\n`;
}

staticImports += `\nexport const cdn = {
    posters: {
       
`;

for (const posterDir of posterDirs) {
  staticImports += `poster${posterDir},\n`;
}

staticImports += `}};`;

fs.writeFileSync("src/staticImports.ts", staticImports);
