import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function UsernameForm() {
  const addUser = async (formData: FormData) => {
    "use server";
    // get username from input
    const username = formData.get("username");
    // write a new user to supabase
    const supabase = createServerActionClient({ cookies });
    await supabase.from("public_profile").insert({ username });
    // reload page
    revalidatePath("/");
  };

  return (
    <div>
      <h1>Create New User</h1>
      <form action={addUser} className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          className="dark:text-black"
          type="text"
          id="username"
          name="username"
        />
        <input
          className="mt-3 dark:bg-neutral-500 hover:cursor-pointer"
          type="submit"
        />
      </form>
    </div>
  );
}
