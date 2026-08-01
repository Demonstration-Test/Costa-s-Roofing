"use client";

import { useEffect, useState } from "react";

export function isDocumentVisible(state: string): boolean {
  return state === "visible";
}

export function useDocumentVisibility(): boolean {
  const [visible, setVisible] = useState(() =>
    typeof document === "undefined"
      ? true
      : isDocumentVisible(document.visibilityState),
  );

  useEffect(() => {
    const update = () => setVisible(isDocumentVisible(document.visibilityState));
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return visible;
}
