import HustLogo from "@/app/components/HustLogo";
import SearchBar from "./SearchBar";
import Image from "next/image";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
            <div className="flex w-4xl items-center">
                <HustLogo />
                <div className="flex-grow">
                    <SearchBar />
                </div>
            </div>

            {/* Clerk Avatar */}
            <div>
                <Image
                    src="/avatar.png"
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            </div>
        </header>
    )
}