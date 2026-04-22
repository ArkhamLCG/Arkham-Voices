import path from "node:path";
import dotenv from "dotenv";
import { ROOT } from "./storage";

const local = path.join(ROOT, ".env.local");
const global = path.join(ROOT, ".env");

dotenv.config({ path: [local, global] });
