import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/">
      <img className={`${className}`} src="/images/logo.png" />
    </Link>
  );
}
