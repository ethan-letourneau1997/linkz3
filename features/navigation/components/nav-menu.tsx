"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { forwardRef, useEffect, useState } from "react";

import { FaApple } from "react-icons/fa";
import Link from "next/link";
import { MenuSpaces } from "./menu-spaces";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserSpace } from "@/types";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "My Profile",
    href: "/docs/primitives/alert-dialog",
    description: "The posts and comments that I have made",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavMenu() {
  const supabase = createClientComponentClient();

  const [subscriptions, setSubscriptions] = useState<UserSpace[]>([]);

  useEffect(() => {
    async function fetchUserSubscriptions() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: user_subscriptions } = await supabase
          .from("user_community")
          .select("*, community_id(*)")
          .eq("user_id", user.id);

        if (user_subscriptions) {
          setSubscriptions(user_subscriptions);
        }
      }
    }
    fetchUserSubscriptions();
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>My Stuff</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                    href="/"
                  >
                    <FaApple className="w-6 h-6" />
                    <div className="mt-4 mb-2 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="My Feed">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>My Stuff</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
              {/* <li className="row-span-3 border border-neutral-800">
                <ListItem href="/subscriptions" title="My Spaces" />
                <ScrollArea className="h-[210px] py-0">
                  <ul className="px-3 space-y-2 text-sm text-neutral-300">
                    {subscriptions?.map((space) => (
                      <li key={space.community_id.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/spaces/${space.community_id.id}/${space.community_id.name}/new/1`}
                          >
                            {space.community_id.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </li> */}
              {/* <li className="row-span-3">
                <h2>My Spaces</h2>
                <ul></ul>
                <ScrollArea className="h-[220px]   mt-3">
                  {subscriptions?.map((space) => (
                    <NavigationMenuLink
                      className="block text-sm font-medium leading-none"
                      asChild
                      key={space.community_id.id}
                    >
                      <Link
                        href={`/spaces/${space.community_id.id}/${space.community_id.name}/new/1`}
                      >
                        {space.community_id.name}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </ScrollArea>
              </li> */}
              <ListItem href="/docs" title="My Profile">
                Posts and Comments I have made
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="My Feed">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
              <ListItem href="/docs/installation" title="My Spaces">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/installation" title="Settings">
                How to install dependencies and structure your app.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
  // eslint-disable-next-line react/prop-types
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
