import NavLinks from '@/app/(dashboard)/_components/nav-link';

export default function SideNav() {
  return (

    <div className="flex h-full flex-col px-3 md:px-2 border-r-2 border-gray-300">
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2 pt-2">
        <NavLinks />
      </div>
    </div>
  );
}