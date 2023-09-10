import { Comments } from "./comments";
import { LoadMoreComments } from "./load-more-comments";
import { fetchComments } from "../api/fetch-comments";

export async function InfiniteScroll() {
  const comments = await fetchComments(1);

  return (
    <div className="max-w-xl mt-5 space-y-4">
      <Comments comments={comments} />
      <LoadMoreComments />
    </div>
  );
}
