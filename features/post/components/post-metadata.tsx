import { Post } from "@/types";
import { fetchProfileById } from "@/lib/profile/fetch-profile-by-id";
import { getTimeSinceNow } from "@/lib/utils/get-time-since-now";

type PostMetadataProps = {
  post: Post;
};

export async function PostMetadata({ post }: PostMetadataProps) {
  const profile = await fetchProfileById(post.created_by);
  const timeSincePost = getTimeSinceNow(post.created_at, true);

  return (
    <>
      posted by {profile.username} - {timeSincePost}
    </>
  );
}
