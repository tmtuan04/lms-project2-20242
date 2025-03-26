import Link from 'next/link';
import NavLinks from '@/app/(dashboard)/_components/nav-link';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (

    <div className="flex h-full flex-col px-3 md:px-2 border-r-2 border-gray-300">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 pt-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md  md:block"></div>
        <Link
          href="/">
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 cursor-pointer rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </Link>
      </div>
    </div>
  );
}