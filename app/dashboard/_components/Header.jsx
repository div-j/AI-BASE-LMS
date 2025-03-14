import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-between p-5 shadow-md sticky top-0 bg-white'>
      <div className='flex gap-2 items-center'>
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
    <Link href="/dashboard">
          <h1 className='text-3xl text-blue-500 font-bold cursor-pointer'>Smart Study</h1>
        </Link>
      </div>
      <UserButton />
    </div>
  )
}
