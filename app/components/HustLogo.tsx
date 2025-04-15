import Image from "next/image";
import Link from "next/link";

const HustLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-3 mx-3 hover:opacity-80">
      <Image src="/LogoHust.png" alt="logo" width={24} height={24} />
      <div className="text-xl font-bold text-red-600">HustLMS</div>
    </Link>
  );
};

export default HustLogo;