import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className="h-[90vh]">
        <SignUp />
      </div>
    </div>
  );
}
