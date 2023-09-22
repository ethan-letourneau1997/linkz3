import { HandleDisplaySubscriptions } from "./handle-display-subscriptions";
import { Separator } from "@/components/ui/separator";

export async function Subscriptions() {
  return (
    <div className="w-full max-w-3xl mt-5 ">
      <h1 className="text-2xl font-bold tracking-tight ">My Subscriptions</h1>
      <Separator className="mt-4" />
      <HandleDisplaySubscriptions />
    </div>
  );
}
