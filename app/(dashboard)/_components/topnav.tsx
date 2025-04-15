import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "@/components/ui/toggle-theme";
import { Search } from "lucide-react";
import HustLogo from "@/app/components/HustLogo";
import Link from "next/link";

export default function TopNav() {
  return (
    <div className="">
      <div className="border-b-2 border-gray-200 py-4 pl-8">
        <div className="grid grid-cols-5 grid-rows-1 gap-4">
          <div>
            <Link className="cursor-pointer" href="/">
              <HustLogo />
            </Link>
          </div>
          {/* Phần Search */}
          <div className="flex col-span-3 items-center border-1 border-gray-300 gap-2 px-3 py-2  shadow-md rounded-full w-2/5 ">
            <Search />
            <input
              type="text"
              placeholder="Search for a course"
              className="w-full outline-none hidden sm:block "
            />
          </div>

          {/* Phần avatar */}
          <div className="col-start-5 flex justify-end items-center gap-5 ml-4 pr-10">
            {/* Phần chuyển theme */}
            <ModeToggle />

            {/* Phần đăng nhập */}
            <SignedOut>
              <SignInButton>
                <button className="bg-gradient-to-b from-purple-500 to-indigo-500  font-semibold text-white px-4 py-[6px]  cursor-pointer rounded-md">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "40px",
                      height: "40px",
                    },
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}
