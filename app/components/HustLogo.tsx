import Image from "next/image";

const HustLogo = () => {
  return (
    <div className="flex items-center gap-3 mx-3">
      <Image src="/LogoHust.png" alt="logo" width={28} height={28} />
      <div className="text-xl font-bold text-red-600">HustLMS</div>
    </div>
  );
};

export default HustLogo;
