"use client";

import { db } from "../config/db";
import { usersTable } from "../config/schema.js";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { eq } from "drizzle-orm";
import  {  useEffect } from "react";

export default function Provider({ children }) {
  const { user } = useUser();

  const checkUser = async () => {

    const resp = await axios.post("api/create-user", {user:user});
    console.log(resp.data);
  };

  useEffect(() => {
    user && checkUser();
  }, [user]);

  return <div>{children}</div>;
}
