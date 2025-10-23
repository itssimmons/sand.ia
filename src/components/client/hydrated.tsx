'use client';
import React, { useEffect, useState } from "react";

/**
 * Hydrated only renders its children after
 * the component has been mounted in the browser.
 */
export default function Hydrated({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  if (!hydrated) return null;

  return <React.Fragment>{children}</React.Fragment>;
}
