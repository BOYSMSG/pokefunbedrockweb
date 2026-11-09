"use client";

import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "./LanguageContext";
import LanguageSettings from "./LanguageSettings";
import HalloweenTheme from "./HalloweenTheme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        {children}
        {/* <LanguageSettings /> */}
        <HalloweenTheme />
      </LanguageProvider>
    </SessionProvider>
  );
}
