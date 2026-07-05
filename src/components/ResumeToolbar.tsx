import Link from "next/link";
import { ResumePrintButton } from "./ResumePrintButton";

const linkClass = "text-[#0969da] hover:underline";

export function ResumeToolbar() {
  return (
    <div className="mb-6 flex items-center justify-end gap-4 print:hidden">
      <Link href="/" className={linkClass}>
        Home
      </Link>
      <ResumePrintButton />
    </div>
  );
}
