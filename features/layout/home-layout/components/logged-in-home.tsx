import { HomeSpaces } from "./home-spaces";

export async function LoggedInHome() {
  return (
    <div className="w-full max-w-3xl">
      <h1 className="mt-5 text-3xl font-medium text-center">
        The latest form my Spaces
      </h1>
      <HomeSpaces />
    </div>
  );
}
