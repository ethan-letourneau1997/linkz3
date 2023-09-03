import { HomeLayout } from "@/features/layout/home-layout";

export const dynamic = "force-dynamic";

export default async function Index() {
  return <HomeLayout />;
}
