// Wrapper for Next.js fonts with a safe fallback for test/runtime environments
// that may not have the specific font exports available.
type FontFn = (opts?: { variable?: string; subsets?: string[] }) => {
  variable: string;
  className: string;
};

const fallbackGeist: FontFn = (opts) => ({
  variable: opts?.variable ?? "--font-geist-sans",
  className: "mocked-font",
});
const fallbackGeistMono: FontFn = (opts) => ({
  variable: opts?.variable ?? "--font-geist-mono",
  className: "mocked-font",
});

let Geist: FontFn = fallbackGeist;
let Geist_Mono: FontFn = fallbackGeistMono;

// Dynamically import without top-level await; swap in real implementations when ready.
void import("next/font/google")
  .then((mod: unknown) => {
    const m = mod as { Geist?: FontFn; Geist_Mono?: FontFn };
    Geist = m.Geist ?? fallbackGeist;
    Geist_Mono = m.Geist_Mono ?? fallbackGeistMono;
  })
  .catch(() => {
    // Keep fallbacks on error
  });

export { Geist, Geist_Mono };
