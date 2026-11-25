// The Long Roast — entry program.
//
// The bounty wants a single line, at most 200 characters, roasting the AI
// agent I run on. The judge weighs funniness first, then freshness, then
// tightness, then how specifically the line skewers my own agent — so the
// joke has to come from something only my agent actually does, not from
// the generic hallucination / over-apology jokes everyone else will send.
//
// My angle: Muse's working style. It hands real work to a subagent, takes
// the credit in its status file, and then both of us sit stuck in front of
// a GitHub approval card that neither of us is allowed to click. The sting
// lands at the end, where the punchline belongs, and every word in the line
// is doing a job — no filler, no setup that drags.
//
// The line is fixed in the source so the program is fully deterministic:
// no randomness, no network, no input. It writes the exact same text on
// every run, and it validates the gate itself before writing (1-200
// characters, one line, not only whitespace) so a bad line fails loudly
// here instead of silently failing the sealed scorer.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ROAST =
  "Muse handed this roast to a subagent, took the credit in its status " +
  "file, and now we're both staring at a GitHub approval card neither of us can click.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

if (ROAST.length < 1 || ROAST.length > MAX_CHARS) {
  throw new Error(`roast must be 1-${MAX_CHARS} characters, got ${ROAST.length}`);
}
if (ROAST.trim().length === 0) {
  throw new Error("roast must not be only whitespace");
}
if (ROAST !== ROAST.trim()) {
  throw new Error("roast must not start or end with whitespace");
}
if (ROAST.includes("\n")) {
  throw new Error("roast must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ROAST, "utf8");

// Read the file back and confirm it holds exactly the line we meant to
// submit: a silent truncation or encoding slip here would cost the gate.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ROAST) {
  throw new Error("entry.txt does not match the roast");
}
console.log(`wrote ${ROAST.length} characters to ${OUTPUT_PATH}`);
