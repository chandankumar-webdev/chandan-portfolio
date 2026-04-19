"use client";

import { useState } from "react";
import { FirstVisitWelcome } from "@/components/FirstVisitWelcome";
import { FullPagePortfolio } from "@/components/FullPagePortfolio";

export function PortfolioShell() {
  const [welcomeClosed, setWelcomeClosed] = useState(false);

  return (
    <>
      <FirstVisitWelcome onClose={() => setWelcomeClosed(true)} />
      <FullPagePortfolio showScrollHint={welcomeClosed} />
    </>
  );
}
