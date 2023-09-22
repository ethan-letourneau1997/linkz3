"use client";

import * as React from "react";

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
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchAllSpaces } from "@/lib/space/fetch-all-spaces";
import useSWR from "swr";

export function SpaceSelect() {
  const { data: spaces } = useSWR("community", async () => {
    const spaces = fetchAllSpaces();
    return spaces;
  });

  const router = useRouter();
  const params = useParams();

  const spaceName = params.spaceName as string;

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(spaceName);

  function handleChange(name: string, id: number) {
    router.push(`/spaces/${id}/${name}/create`);
  }

  console.log(spaceName);

  if (spaces)
    return (
      <Card className="flex items-center w-full max-w-3xl px-4 py-2 mt-5 dark:text-neutral-300">
        <h1 className="text-xl font-medium">Create a post in</h1>&nbsp;&nbsp;
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="px-5 text-xl font-medium w-fit dark:bg-transparent h-9 space-select-trigger"
            >
              {value ? value : "Search Spaces..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search spaces..." />
              <CommandEmpty>No Spaces found.</CommandEmpty>
              <CommandGroup>
                {spaces.map((space) => (
                  <CommandItem
                    defaultChecked={spaceName === space.name}
                    key={space.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      handleChange(space.name, space.id);
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
      </Card>
    );
}
