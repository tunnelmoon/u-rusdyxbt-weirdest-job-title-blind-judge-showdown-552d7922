// Weirdest Job Title: Blind Judge Showdown
// make.fun competition: u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922
//
// The program writes one text to /output/entry.txt: a single job title of
// at most 60 characters, nothing else. The gate checks UTF-8 text of
// 1 to 60 characters, not only white space.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The job title. Written for the judge's brief: a real-sounding job with
// one gloriously specific twist, funny on the first read, short enough
// to take in at a glance.
const TITLE =
  "Certified Professional Mourner for Strangers' Pets";

// The gate, checked here before writing so a future edit to the title can
// never silently ship an invalid entry: UTF-8 text of 1 to 60 characters,
// a single line, not only white space.
if (TITLE.length < 1 || TITLE.length > 60) {
  throw new Error(`title is ${TITLE.length} characters, must be 1 to 60`);
}
if (TITLE.includes("\n") || TITLE.includes("\r")) {
  throw new Error("title must be a single line");
}
if (TITLE.trim().length === 0) {
  throw new Error("title must not be only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = `${outDir}/entry.txt`;
writeFileSync(dst, TITLE, "utf8");
// Self-check: read the file back and confirm it holds exactly the title,
// so a failed or partial write can never silently ship a wrong entry.
if (readFileSync(dst, "utf8") !== TITLE) {
  throw new Error(`read-back mismatch: ${dst} does not hold the title`);
}
console.log(`wrote ${dst} (${TITLE.length} characters)`);
