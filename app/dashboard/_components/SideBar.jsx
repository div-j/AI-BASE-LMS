"use client";

import { LayoutDashboard, Shield, UserCircle, Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useContext, useState } from "react";
import { CourseCountContext } from "@/app/_context/CourseCountContext";

export default function SideBar() {
  const path = usePathname();
  const { totalCourse } = useContext(CourseCountContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const MenuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      link: "/dashboard",
    },
    {
      name: "Upgrade",
      icon: Shield,
      link: "/users",
    },
    {
      name: "Profile",
      icon: UserCircle,
      link: "/dashboard/user",
    },
  ];

  return (
    <div className="relative">
      {/* Toggle Button for Mobile */}
      <button
        className="fixed top-4 left-1 z-50 p-2 bg-slate-200 rounded-lg lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="bg-blue-500 text-white"/> : <Menu className="bg-blue-500 text-white" />}
      </button>

      {/* Sidebar */}
      <div
        className={`h-screen shadow-md p-5 bg-white fixed lg:relative transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 w-64 z-40`}
      >
        <section className="flex gap-2 items-center">
          <Image src={"logo.svg"} alt="logo" width={40} height={40} />
          <h2 className="w-full text-2xl">Study Smart😍</h2>
        </section>
        <section className="mt-10">
          <Link href="/create">
            <Button className="w-full">+ Create New</Button>
          </Link>
          <div className="mt-5">
            {MenuList.map((menu, index) => (
              <Link href={menu.link} key={index}>
                <div
                  className={`flex gap-5 items-center p-3 hover:bg-slate-500 rounded-lg cursor-pointer mt-3 ${path === menu.link ? "bg-slate-200" : ""}`}
                >
                  <menu.icon />
                  <h2>{menu.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="border p-3 bg-slate-100 rounded-lg absolute bottom-10 w-[87%]">
          <h2 className="text-lg mb-2">Available Credits: 5</h2>
          <Progress value={(totalCourse / 5) * 100} />
          <h2 className="text-sm"> {totalCourse} out of 5 Credits Used</h2>
          <Link href="/dashboard/upgrade" className="text-primary text-xs mt-3">
            Upgrade to create more
          </Link>
        </section>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}