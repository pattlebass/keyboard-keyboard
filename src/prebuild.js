import fs from "fs";
import { createNumpad } from "./createNumpad.js";

const template = fs.readFileSync("index.template.html", "utf8");
const numpad = createNumpad();

const output = template.replace("<!--BUILD_NUMPAD-->", numpad);
fs.writeFileSync("index.html", output);
console.log("index.html was statically generated");
