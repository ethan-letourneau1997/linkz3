import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Textarea } from "@/components/ui/textarea";

export function MobileReplyInput() {
  return (
    <Sheet>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            <Textarea />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
