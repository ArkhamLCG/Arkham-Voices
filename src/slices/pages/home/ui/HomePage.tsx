import reactLogo from "../../../shared/assets/react.svg";
import viteLogo from "/vite.svg";
import { Link } from "wouter";
import { useAppStore } from "../../../shared/model/appStore";
import styles from "./HomePage.module.css";

export function HomePage() {
  const count = useAppStore((s) => s.count);
  const inc = useAppStore((s) => s.inc);
  const dec = useAppStore((s) => s.dec);
  const reset = useAppStore((s) => s.reset);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className={`${styles.logo} ${styles.react}`}
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React (FSD)</h1>
      <p className={styles.readTheDocs}>Edit `src/slices/pages/home/ui/HomePage.tsx`</p>

      <div className={styles.card}>
        <p>zustand count: {count}</p>
        <div className={styles.row}>
          <button type="button" onClick={dec}>
            -1
          </button>
          <button type="button" onClick={inc}>
            +1
          </button>
          <button type="button" onClick={reset}>
            reset
          </button>
        </div>
        <p>
          <Link href="/nope">go to 404</Link>
        </p>
      </div>
    </>
  );
}

