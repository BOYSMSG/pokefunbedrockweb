"use client";

import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "./LanguageContext";
import LanguageSettings from "./LanguageSettings";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        {children}
        <LanguageSettings />
      </LanguageProvider>
    </SessionProvider>
  );
}
