import { HomeSpaces } from "./home-spaces";

export async function LoggedInHome() {
  return (
    <div className="w-full max-w-3xl space-y-3">
      <h1 className="mt-5 text-xl font-medium text-center md:text-3xl">
        The latest from my Spaces
      </h1>
      <HomeSpaces />
    </div>
  );
}
