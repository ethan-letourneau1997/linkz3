"use client";

import React from "react";
import { User } from "@supabase/supabase-js";

type NavHeaderProps = {
  user: User | null;
};

export function NavHeader({ user }: NavHeaderProps) {
  return <div>new nav</div>;
}
