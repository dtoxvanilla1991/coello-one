// Wrapper for Next.js fonts with a safe fallback for test/runtime environments
// that may not have the specific font exports available.
type FontFn = (opts?: { variable?: string; subsets?: string[] }) => { variable: string; className: string };

let Geist: FontFn;
let Geist_Mono: FontFn;

// Use dynamic import with a fallback to avoid test env issues
try {
  // eslint-disable-next-line no-new-func
  const mod = (await import('next/font/google')) as unknown as { Geist?: FontFn; Geist_Mono?: FontFn };
  Geist = mod.Geist ?? ((opts) => ({ variable: opts?.variable ?? '--font-geist-sans', className: 'mocked-font' }));
  Geist_Mono = mod.Geist_Mono ?? ((opts) => ({ variable: opts?.variable ?? '--font-geist-mono', className: 'mocked-font' }));
} catch {
  Geist = (opts) => ({ variable: opts?.variable ?? '--font-geist-sans', className: 'mocked-font' });
  Geist_Mono = (opts) => ({ variable: opts?.variable ?? '--font-geist-mono', className: 'mocked-font' });
}

export { Geist, Geist_Mono };
