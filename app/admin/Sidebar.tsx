"use client";

import { usePathname } from "next/navigation";
import { adminLinks } from "@/utils/links";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside>
      {adminLinks.map(({ href, label }) => {
        const isActive = pathname === href;
        const variant = isActive ? "default" : "ghost";

        return (
          <Button
            asChild
            variant={variant}
            className="capitalize font-normal mb-2 w-full justify-start"
            key={href}
          >
            <Link href={href}>{label}</Link>
          </Button>
        );
      })}
    </aside>
  );
}
export default Sidebar;
