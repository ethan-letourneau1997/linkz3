import { DisplayPosts } from "./display-posts";
import { Sort } from "./home-sort";

export async function HomeSpaces() {
  return (
    <div className="px-2 md:px-0">
      home
      {/* <Sort
        newPosts={<DisplayPosts sortBy="new" />}
        oldPosts={<DisplayPosts sortBy="old" />}
        topPosts={<DisplayPosts sortBy="top" />}
      /> */}
    </div>
  );
}
