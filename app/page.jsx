import { UserButton } from "@clerk/nextjs";
import React from "react";
import Header from "./dashboard/_components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Facebook, Instagram, Video, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <div className="flex space-y-4  items-center flex-col justify-center h-[80vh]">
          <div className="flex items-center justify-center gap-x-32 ">
            <Image
              src="/knowledge.png"
              alt="logo"
              width={50}
              height={50}
              className="-rotate-45"
            />

            <div className="  text-center font-bold">
              <h1 className="text-blue-500 text-3xl ">
                Unlock Your Study Potential
              </h1>
              <h1 className="text-black text-2xl ">
                Generate Custom Study Materials with Our AI-Powered Tool
              </h1>
            </div>
            <Image
              src="/code.png"
              alt="logo"
              width={50}
              height={50}
              className="rotate-45"
            />
          </div>
          <div className="text-center">

          <p className="text-gray-400 text-sm">
            Your AI All Prep Companion: Effortless Study Material At your
            fingertips
          </p>
          <p className="text-gray-400 text-sm">
            Take control of your learning with our AI-powered study app. Learn
            at your own pace and achieve academic success.
          </p>
          </div>
          <div className="flex gap-5">
            <Link href="/dashboard">
              <Button className="mt-5">
                Get Started <ArrowRight className="inline" />
              </Button>
            </Link>
            <Button className="mt-5" variant="outline">
              <Video className="inline" />
              Learn More
            </Button>
          </div>

          <h1 className="text-gray-400  mt-8 font-bold text-2xl capitalize">
            featured In
          </h1>

          <section className="flex gap-5 items-center justify-center">
            <div className="flex gap-2 items-center">
              <Youtube className="text-red-500" />
              <p className="font-bold text-2xl text-gray-500">YouTube</p>
            </div>
            <div className="flex gap-2 items-center">
              <Facebook className="text-blue-gray" />
              <p className="font-bold text-2xl text-gray-500">Facebook</p>
            </div>
            <div className="flex gap-2 items-center ">
              <Instagram className="text-red-500" />
              <p className="font-bold text-2xl text-gray-500">Instagram</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
