import path from "node:path";

export const ROOT = process.cwd();
export const CACHE_DIR = path.join(ROOT, "cache");
export const PUBLIC_DIR = path.join(ROOT, "public");
