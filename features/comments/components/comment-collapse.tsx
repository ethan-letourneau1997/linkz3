"use client";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

import { CgArrowsExpandLeft } from "react-icons/cg";
import { MdCloseFullscreen } from "react-icons/md";
import { useState } from "react";

type CommentCollapseProps = {
  header: JSX.Element;
  children: JSX.Element;
};

export function CommentCollapse({ header, children }: CommentCollapseProps) {
  const [open, setOpen] = useState(true);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="w-full max-w-3xl ">
      <div className="flex gap-2 mt-5">
        <button onClick={handleOpen} className={`${open ? "hidden" : "block"}`}>
          <CgArrowsExpandLeft className="text-neutral-400" />
        </button>
        <button
          onClick={handleClose}
          className={`${open ? "block" : "hidden"} md:hidden`}
        >
          <MdCloseFullscreen className="rotate-90 text-neutral-400" />
        </button>
        {header}
      </div>

      <Collapsible open={open}>
        <CollapsibleContent>
          <div className="flex pt-2 pl-1">
            <button
              onClick={handleClose}
              className="flex justify-center w-4 group"
            >
              <div className="bg-neutral-700 w-[1px] group-hover:bg-neutral-300" />
            </button>
            <div className="w-full md:pl-4">{children}</div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
