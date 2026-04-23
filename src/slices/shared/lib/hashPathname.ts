import { useSyncExternalStore } from "react";

/**
 * Current path from `location.hash`, matching wouter’s `useHashLocation` snapshot
 * (`"/" + location.hash.replace(/^#?\/?/, "")`). Use this when reading the route outside
 * wouter’s `relativePath(router.base, …)` — e.g. language from `/:language/...`.
 */
function getHashPathname(): string {
  if (typeof window === "undefined") return "/";
  return `/${window.location.hash.replace(/^#?\/?/, "")}`;
}

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  window.addEventListener("popstate", cb);
  return () => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener("popstate", cb);
  };
}

export function useHashPathname() {
  return useSyncExternalStore(subscribe, getHashPathname, () => "/");
}
