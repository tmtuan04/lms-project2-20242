import Image from 'next/image';


export default function HustLogo() {
    return (
        <div
            className=" flex flex-row items-center leading-none gap-3"
        >
            <Image src="/hustlogo.png" alt="logo" width={32} height={32} />
            <p className="text-2xl lg:text-3xl text-red-700 font-semibold hidden lg:block"  >HustLMS</p>
        </div>
    );
}