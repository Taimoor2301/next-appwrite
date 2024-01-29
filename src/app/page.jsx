import LogoutButton from "src/components/LogoutButton";

export default async function Home() {
  return (
    <div className="w-full bg-white h-full flex gap-10 p-10 justify-center items-center text-center font-bold max-w-7xl mx-auto rounded-md">
      <div className="flex-1">
        <img src="/tech.svg" className="max-h-full object-cover" />
      </div>
      <div className="flex flex-col flex-1 justify-center items-center">
        <h1 className="text-6xl">Welcome Home</h1>{" "}
        <p className="text-sm py-5 w-1/2 text-neutral-600 font-normal">
          Next JS Authentication system using JSON Webtoken, Mailing Service and
          more.
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
