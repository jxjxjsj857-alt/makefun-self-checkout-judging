// The Self-Checkout Is Judging You — entry for make.fun.
// Writes one funny line in the voice of a smug self-checkout machine
// (at most 200 characters) to /output/entry.txt.
// Node 22, no dependencies.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Please place your twelve yogurts in the bagging area. One by one. I have all day. You clearly do too.";

// The gate only accepts UTF-8 text of 1 to 200 characters, not only
// whitespace. Fail loudly instead of writing an entry that cannot win.
if (LINE.trim().length === 0 || LINE.length > 200) {
  throw new Error(`Line must be 1-200 characters, got ${LINE.length}.`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and confirm the file holds exactly the line, so a partial
// or failed write cannot pass silently.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("Wrote /output/entry.txt but its content differs.");
}
console.log(`Wrote ${LINE.length}-character line to /output/entry.txt`);
