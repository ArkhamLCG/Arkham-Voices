import "./util/env";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./util/storage";

const baseUrl = process.env.VITE_ARKHAM_DIVIDER_DATA_URL;
const fontUrl = `${baseUrl}/fonts`;

const outDir = path.join(ROOT, "public/icons");

export const download = async (type: string) => {
  console.log(`downloading format ${type}`);
  const url = `${fontUrl}/icons.${type}`;
  const response = await fetch(url);
  const data = await response.arrayBuffer();

  const outFile = path.join(outDir, `icons.${type}`);

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, Buffer.from(data));
};

export async function run() {
  await download("woff");
  await download("woff2");
  await download("ttf");
  await download("css");
}

run();
