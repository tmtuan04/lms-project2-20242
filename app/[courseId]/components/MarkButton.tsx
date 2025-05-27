"use client";

import { useState } from "react";
import { BookOpenCheck } from "lucide-react";

interface MarkButtonProps {
    initialMarked: boolean;
}

const MarkButton: React.FC<MarkButtonProps> = ({ initialMarked }) => {
    const [isMarked, setIsMarked] = useState(initialMarked);

    const toggleMarked = () => {
        setIsMarked((prev) => !prev);
    };

    return (
        <button
            onClick={toggleMarked}
            className={`flex items-center gap-2 px-4  rounded-md cursor-pointer py-[5px] text-white ${isMarked ? "bg-[#0fba82] hover:bg-[#04976a]" : " bg-blue-600 hover:bg-blue-700"
                }`}
        >
            {isMarked && <BookOpenCheck className="h-5 w-5" />}
            {isMarked ? "Marked" : "Mark"}
        </button>
    );
};

export default MarkButton;