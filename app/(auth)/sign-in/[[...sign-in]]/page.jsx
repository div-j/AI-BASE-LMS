import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className="h-[90vh]">
        <SignIn />
      </div>
    </div>
  );
}
