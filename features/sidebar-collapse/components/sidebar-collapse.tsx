"use client";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Card } from "@/components/ui/card";
import { useState } from "react";

type SidebarCollapseProps = {
  children: React.ReactNode;
};

export function SidebarCollapse({ children }: SidebarCollapseProps) {
  const [isDisplayed, setIsDisplayed] = useState(true);

  function toggleDisplay() {
    setIsDisplayed(!isDisplayed);
  }

  const displayedClassees = "px-2";
  const hiddenClasses = "p-0 ";

  return (
    <Card
      className={`hidden mt-5 space-y-3 rounded-sm h-fit md:block  ${
        isDisplayed ? "w-72" : ""
      }`}
    >
      <div
        className={`bg-indigo-600 h-[30px] flex items-center  ${
          isDisplayed ? displayedClassees : hiddenClasses
        }`}
      >
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild className="h-fit w-fit">
              <button onClick={toggleDisplay} className="h-full px-2 ">
                {isDisplayed ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {isDisplayed ? "Hide Sidebar" : "Show Sidebar"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* <button onClick={toggleDisplay} className="h-full px-2 ">
          {isDisplayed ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button> */}
      </div>
      {isDisplayed && <>{children}</>}
    </Card>
  );
}
