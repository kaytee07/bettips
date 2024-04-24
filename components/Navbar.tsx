"use client"
import Link from 'next/link'
import React from 'react'
import MobileNav from './ui/MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="flex w-full justify-between px-6 py-1 lg:px-10 text-white">
      <Link
        href="/"
        className="flex items-center gap-1"
      >
        <p className="text-[26px] font-extrabold">Bettips</p>
      </Link>
      <div className="flex gap-5 justify-between items-center text-white">
        {/* clerk user management */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div className="md:hidden">
           {user && <MobileNav/>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
