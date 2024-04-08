import * as React from "react";
import { Balancer } from "react-wrap-balancer";

import { cn } from "@/lib/utils";
import { siteConfig } from "./config";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center pt-24">
      <div className="z-10 min-h-[50vh] w-full max-w-4xl px-5 xl:px-0">
        <h1
          className="animate-fade-up from-foreground to-muted-foreground bg-gradient-to-br bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] opacity-0 drop-shadow-sm dark:text-[#FCFCFD] md:text-6xl/[5rem]"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Hand in Hand, Let&apos;s Build a Green Home Together.
          </Balancer>
        </h1>
        <p
          className="animate-fade-up mt-6 text-center opacity-0 dark:text-[#98A2B3] md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Every Shade of Green Warms the World.
          </Balancer>
        </p>
        <div
          className="animate-fade-up mx-auto mt-6 flex items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.40s", animationFillMode: "forwards" }}
        >
        </div>
      </div>
    </main>
  );
}
