"use client";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

import { CgArrowsExpandLeft } from "react-icons/cg";
import { useState } from "react";

type CommentCollapseProps = {
  header: JSX.Element;
  children: JSX.Element;
};

export function CommentCollapse({ header, children }: CommentCollapseProps) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="w-full max-w-3xl mt-4 ml-2 sm:hidden">
        <button className="w-full" onClick={() => setOpen(!open)}>
          {header}
        </button>

        <Collapsible open={open}>
          <CollapsibleContent className=" CollapsibleContent">
            <div className="w-full px-2 ml-2 border-l border-neutral-800 ">
              {children}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="hidden w-full max-w-3xl sm:block">
        <div className="flex gap-2 mt-5">
          <button
            onClick={() => setOpen(true)}
            className={`${open ? "hidden" : "block"}`}
          >
            <CgArrowsExpandLeft className="text-neutral-400 dark:hover:text-neutral-300" />
          </button>

          {header}
        </div>

        <Collapsible open={open}>
          <CollapsibleContent className="CollapsibleContent">
            <div className="flex pt-2 pl-1">
              <button
                onClick={() => setOpen(false)}
                className="flex justify-center w-4 group"
              >
                <div className="bg-neutral-700 w-[1px] group-hover:bg-neutral-300" />
              </button>
              <div className="w-full pl-4">{children}</div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
}
