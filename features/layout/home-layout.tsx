import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { UsernameForm } from "@/features/username-form";

export async function HomeLayout() {
  const supabase = createServerComponentClient({ cookies });

  async function checkUserProfile() {
    try {
      const { data } = await supabase.auth.getSession();

      const { data: public_profile } = await supabase
        .from("public_profile")
        .select()
        .eq("id", data.session?.user.id)
        .single();

      return public_profile;
    } catch (error) {
      console.log(error);
    }
  }

  const userProfile = await checkUserProfile();

  if (!userProfile) return <UsernameForm />;

  if (userProfile)
    return (
      <div className="mt-5 text-center">
        <h1 className="text-2xl font-medium">Hello {userProfile.username}!</h1>
      </div>
    );
}
