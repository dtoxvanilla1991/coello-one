type DrizzleJournalEntry = {
  tag?: string;
};

type DrizzleJournal = {
  entries?: DrizzleJournalEntry[];
};

const journalFile = Bun.file(new URL("../drizzle/migrations/meta/_journal.json", import.meta.url));

if (!(await journalFile.exists())) {
  console.error("[drizzle] Missing drizzle journal at drizzle/migrations/meta/_journal.json");
  process.exit(1);
}

const journal = (await journalFile.json()) as DrizzleJournal;
const entries = journal.entries ?? [];

if (!Array.isArray(entries) || entries.length === 0) {
  console.error("[drizzle] No entries found in drizzle journal (unexpected)");
  process.exit(1);
}

const missingSqlFiles: string[] = [];

for (const entry of entries) {
  const tag = entry.tag;
  if (!tag) {
    console.error("[drizzle] Found journal entry with missing tag");
    process.exit(1);
  }

  const sqlFileName = `${tag}.sql`;
  const sqlFile = Bun.file(new URL(`../drizzle/migrations/${sqlFileName}`, import.meta.url));
  if (!(await sqlFile.exists())) {
    missingSqlFiles.push(sqlFileName);
  }
}

if (missingSqlFiles.length > 0) {
  console.error("[drizzle] Journal contains tags with no matching SQL file:");
  for (const fileName of missingSqlFiles) {
    console.error(`- drizzle/migrations/${fileName}`);
  }
  process.exit(1);
}

console.log(`[drizzle] Journal tags OK (${entries.length} entries)`);
