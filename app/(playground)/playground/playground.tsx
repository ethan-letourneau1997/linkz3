import { Pagination } from "@/features/pagination";

export async function Playground() {
  return (
    <div className="mt-5">
      <Pagination currentPage={2} totalPages={10} />
    </div>
  );
}
