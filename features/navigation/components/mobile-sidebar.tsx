"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

import { RxHamburgerMenu } from "react-icons/rx";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

type DesktopNavigationProps = {
  children: JSX.Element;
  header: JSX.Element;
};

export function MobileSidebar({ children, header }: DesktopNavigationProps) {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  // close the sheet when the pathname changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function handleOpen() {
    setOpen(true);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={handleOpen}>
        <RxHamburgerMenu className="text-xl" />
      </SheetTrigger>
      <SheetContent side="left" className=" border-neutral-500">
        <SheetHeader>
          <SheetTitle>{header}</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Separator className="mt-2 dark:bg-neutral-700" />
        {children}
      </SheetContent>
    </Sheet>
  );
}
