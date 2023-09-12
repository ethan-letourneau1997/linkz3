"use client";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

import { BiExpand } from "react-icons/bi";
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
    <div className="w-full max-w-3xl mt-5 ">
      <div className="flex gap-2">
        <button onClick={handleOpen} className={`${open ? "hidden" : "block"}`}>
          <BiExpand />
        </button>
        {header}
      </div>

      <Collapsible open={open}>
        <CollapsibleContent>
          <div className="flex pt-3 pl-1">
            <button
              onClick={handleClose}
              className="flex justify-center w-4 group"
            >
              <div className="bg-neutral-500 w-[1px] group-hover:bg-neutral-200" />
            </button>
            <div className="w-full">{children}</div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

// export function CommentCollapse() {
//     const [open, setOpen] = useState(false);

//     function handleOpen() {
//       setOpen(true);
//     }
//     function handleClose() {
//       setOpen(false);
//     }

//     return (
//       <div className="w-full max-w-3xl mt-5 bg-neutral-900">
//         <Button onClick={handleClose}>Close</Button>
//         <div className="flex gap-2">
//           <button onClick={handleOpen} className={`${open ? "hidden" : "block"}`}>
//             <BiExpand />
//           </button>
//           <CommentHeader />
//         </div>

//         <Collapsible defaultOpen open={open}>
//           <CollapsibleContent>
//             <div className="flex">
//               <button
//                 onClick={handleClose}
//                 className="flex justify-center w-4 group"
//               >
//                 <div className="bg-neutral-500 w-[1px] group-hover:bg-neutral-200" />
//               </button>
//               <CommentBody />
//             </div>
//           </CollapsibleContent>
//         </Collapsible>
//       </div>
//     );
//   }
