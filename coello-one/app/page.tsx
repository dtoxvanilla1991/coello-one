import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link href="/access-denied">Access Denied</Link>
        </li>
        <li>
          <Link href="/welcome">Welcome</Link>
        </li>
        <li>
          <Link href="/not-found">Not Found</Link>
        </li>
        <li>
          <Link href="/coming-soon">Coming Soon</Link>
        </li>
        <li>
          <Link href="/maintenance">Maintenance</Link>
        </li>
      </ul>
    </section>
  );
}
