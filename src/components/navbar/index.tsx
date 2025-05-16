"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <header className="sticky top-0 right-0 z-10 bg-primary-400 p-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            AMedical Appointment
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/find-a-doctor" className="font-medium">
              Find a Doctor
            </Link>

            <SignedIn>
              <Link href="/appointments" className="font-medium">
                My Appointments
              </Link>
              <UserButton showName />
            </SignedIn>

            <SignedOut>
              <button className="button bg-cover">
                <Link href="/auth/sign-in">Sign In</Link>
              </button>
              <button className="button bg-cover">
                <Link href="/auth/sign-up">Sign Up</Link>
              </button>
            </SignedOut>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
