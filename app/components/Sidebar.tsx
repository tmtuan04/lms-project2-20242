import HustLogo from "./HustLogo";
import Link from "next/link";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
// import ModeToggle from "@/components/ModeToggle";

const Sidebar = () => {
  return (
    <header className="flex justify-between items-center p-3 shadow-md bg-gray-50 fixed z-100 w-full">
      <HustLogo />

      <div className="flex gap-3">
        {/* <ModeToggle /> */}
        <SignedIn>
          <Link href="/dashboard">
            <Button variant="outline" className="hover:bg-gray-200 hover:rounded-full transition">
              Dashboard
            </Button>
          </Link>
        </SignedIn>
        <SignedOut>
          <div className="flex gap-2">
            <SignInButton>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Sidebar;