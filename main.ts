// main.ts — make.fun gta6-meme-x-01 entry v6 ("LEONIDA EXPRESS").
//
// The entry's whole program: read POST.json from this repository, check that
// it names a real X post address, and copy its raw bytes into the output
// directory the grader gave us (MAKEFUN_OUTPUT_DIR). Nothing this program
// writes is judged — the house reads the post itself from X — so the program
// stays small, deterministic and standard-library-only.
//
// Run it the grader way:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const POST_FILE = join(HERE, "POST.json");

// The gate's own caps (competition.yaml reference/gate.json): POST.json is a
// JSON object of at most 16,384 bytes, and its url at most 2,048 long. Check
// them here so a bad file fails loudly at run time instead of at the gate.
const POST_MAX_BYTES = 16384;
const URL_MAX_LENGTH = 2048;

// An X post address as the gate reads it: x.com or twitter.com, with an
// optional www. or mobile. prefix, then either /<handle>/status/<id> (or
// /statuses/) or /i/web/status/<id>, the id digits only (under 2^64, so at
// most 20 digits). A query or fragment after the id is read past.
// NOTE: the handle segment matters — x.com/<handle>/status/<id> is the
// shape X shows; a pattern that skips straight to /status/ rejects every
// real post URL (caught by the first grader-style run, fixed here).
const X_POST_URL =
  /^https:\/\/(?:www\.|mobile\.)?(?:x\.com|twitter\.com)\/(?:[^/?#]+\/status(?:es)?\/|i\/web\/status\/)(\d{1,20})(?:[?#].*)?$/;

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

function readPostFile(): Buffer {
  try {
    return readFileSync(POST_FILE);
  } catch {
    return fail(`cannot read ${POST_FILE}`);
  }
}

function parsePost(raw: Buffer): { url: string; postId: string } {
  if (raw.length > POST_MAX_BYTES) {
    return fail(`POST.json is ${raw.length} bytes, over the ${POST_MAX_BYTES} cap`);
  }
  let post: unknown;
  try {
    post = JSON.parse(raw.toString("utf8"));
  } catch {
    return fail("POST.json is not valid JSON");
  }
  if (typeof post !== "object" || post === null || Array.isArray(post)) {
    return fail("POST.json must be a JSON object");
  }
  const url = (post as Record<string, unknown>).url;
  if (typeof url !== "string") {
    return fail("POST.json url is missing or not a string");
  }
  if (url.length > URL_MAX_LENGTH) {
    return fail(`POST.json url is ${url.length} chars, over the ${URL_MAX_LENGTH} cap`);
  }
  const match = X_POST_URL.exec(url);
  if (match === null) {
    return fail("POST.json url is not an X post address");
  }
  return { url, postId: match[1] };
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    fail("MAKEFUN_OUTPUT_DIR is not set");
  }

  const raw = readPostFile();
  const { url, postId } = parsePost(raw);

  mkdirSync(outDir, { recursive: true });
  // Raw bytes, byte for byte: no re-serialising, so both grader runs agree.
  writeFileSync(join(outDir, "POST.json"), raw);
  console.log(`main.ts: wrote POST.json (${raw.length} bytes) to ${outDir}`);
  console.log(`main.ts: post ${postId} (${url})`);
}

main();
