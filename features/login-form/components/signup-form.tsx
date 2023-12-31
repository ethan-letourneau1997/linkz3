"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Messages from "./messages";

export function SignupForm() {
  return (
    <form action="/auth/sign-up" method="post">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up for a new account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="you@example.com"
              required
              id="email"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Sign Up</Button>
          <Messages />
        </CardFooter>
      </Card>
    </form>
  );
}
