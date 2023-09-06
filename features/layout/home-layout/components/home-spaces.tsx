import { HomeSort } from "./home-sort";
import { NewPosts } from "./new-posts";
import { OldPosts } from "./old-posts";
import { TopPosts } from "./top-posts";

export async function HomeSpaces() {
  return (
    <>
      <HomeSort
        newPosts={<NewPosts />}
        oldPosts={<OldPosts />}
        topPosts={<TopPosts />}
      />
    </>
  );
}
