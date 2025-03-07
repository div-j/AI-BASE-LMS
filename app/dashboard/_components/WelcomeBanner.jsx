'use client'
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

export default function WelcomeBanner() {
  const { user } = useUser();
  return (
    <div>
      <div className="bg-blue-500 w-full text-white rounded-lg p-5 flex items-center gap-6">
        <Image src={"/laptop.png"} alt="laptop" width={100} height={100} />
        <div>
          <h1 className="text-3xl font-bold capitalize">Hello {user?.fullName}</h1>
          <p className="text-sm">Welcome Back, It's time to get back to learning new course</p>
        </div>
      </div>
    </div>
  );
}
