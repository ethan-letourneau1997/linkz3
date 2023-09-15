"use client";

import { CustomFlowbiteTheme, Pagination } from "flowbite-react";

import { useRouter } from "next/navigation";

type PageNavigationProps = {
  activePage: number;
  pageCount: number;
};

export function PageNavigation({ activePage, pageCount }: PageNavigationProps) {
  if (pageCount <= 1) return null;
  if (pageCount > 1) return null;

  const router = useRouter();

  const customTheme: CustomFlowbiteTheme["pagination"] = {
    base: "",
    layout: {
      table: {
        base: "text-sm text-gray-700 dark:text-gray-400",
        span: "font-semibold text-gray-900 dark:text-white",
      },
    },
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-neutral-700 dark:bg-transparent dark:text-gray-400 enabled:dark:hover:bg-transparent enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      next: {
        base: "rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-neutral-700 dark:bg-transparent dark:text-gray-400 enabled:dark:hover:bg-transparent enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      selector: {
        base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-neutral-700 dark:bg-transparent dark:text-gray-400 enabled:dark:hover:bg-transparent enabled:dark:hover:text-white",
        active:
          "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white",
        disabled: "opacity-50 cursor-normal",
      },
    },
  };

  return (
    <div className="flex justify-center mt-3">
      <Pagination
        theme={customTheme}
        currentPage={activePage}
        onPageChange={(page) => {
          router.push(`${page}`);
        }}
        totalPages={pageCount}
      />
    </div>
  );
}
