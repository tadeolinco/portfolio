"use client";

export function ResumePrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md border border-[#d0d7de] bg-white px-3 py-1.5 text-sm text-[#24292f] hover:bg-[#f6f8fa]"
      aria-label="Print resume or save as PDF"
    >
      Save as PDF
    </button>
  );
}
