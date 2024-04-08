import type { Route } from "next";
import * as Lucide from "lucide-react";

export const siteConfig = {
  name: "EcoHaven",
  description:
    "Environmental Protection, for a Better Life.",
  github: "https://github.com/vv1133/EcoHaven",
  twitter: "https://twitter.com/vv11332",
};

export const navItems = [
  {
    href: "/quiz",
    title: "Eco Challenge Quiz",
  },
  {
    href: "/park",
    title: "Eco Fun Park",
  },
] satisfies { href: Route; title: string }[];

