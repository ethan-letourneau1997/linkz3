import { Playground } from "./playground";

export const dynamic = "force-dynamic";

export default async function Index({ params, searchParams }) {
  return (
    <>
      <div>
        {searchParams.a} {searchParams.b}
      </div>
      <Playground />
    </>
  );
}
