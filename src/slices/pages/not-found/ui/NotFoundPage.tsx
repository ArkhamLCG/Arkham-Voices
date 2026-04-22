import { Link } from "wouter";

export function NotFoundPage() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>404</h1>
      <p>Page not found</p>
      <p>
        <Link href="/">Go home</Link>
      </p>
    </div>
  );
}
