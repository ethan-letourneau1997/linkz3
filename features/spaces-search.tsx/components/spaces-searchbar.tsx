"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Space } from "@/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SpacesSearchbar = {
  spaces: Space[];
};

export function SpacesSearchbar({ spaces }: SpacesSearchbar) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between dark:bg-dark-900 dark:text-neutral-400 "
        >
          {value ? value : "Search Spaces..."}
          <AiOutlineSearch className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search spaces..." />
          <CommandEmpty>No Spaces found.</CommandEmpty>
          <CommandGroup>
            {spaces.map((space) => (
              <CommandItem
                key={space.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  router.push(`/spaces/${space.id}/${space.name}/new/1`);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === space.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {space.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
