"use client";

import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  className?: string;
  text?: string;
};

export function BackButton({ className, text }: BackButtonProps) {
  const router = useRouter();

  function handleNavigateBack() {
    router.back();
  }
  return (
    <button
      onClick={handleNavigateBack}
      className={`${className} flex items-center gap-1 dark:text-neutral-500 text-sm dark:hover:underline hover:dark:text-neutral-300`}
    >
      <FiChevronLeft className="mt-0.5" />
      {text ? text : "back"}
    </button>
  );
}
