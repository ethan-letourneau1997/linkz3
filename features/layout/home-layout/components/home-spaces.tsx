import { HomeSort } from "./home-sort";
import { NewPosts } from "./new-posts";
import { OldPosts } from "./old-posts";
import { TopPosts } from "./top-posts";

export async function HomeSpaces() {
  return (
    <div className="px-2 md:px-0">
      <HomeSort
        newPosts={<NewPosts />}
        oldPosts={<OldPosts />}
        topPosts={<TopPosts />}
      />
    </div>
  );
}
