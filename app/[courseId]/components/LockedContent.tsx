"use client";

import { Lock } from "lucide-react";

export default function LockedContent({ price }: { price: number }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 text-white rounded-md">
      <Lock className="h-8 w-8 mb-2" />
      <p className="text-lg font-semibold">This chapter is locked</p>
      <p className="text-sm text-slate-400">Purchase the course to access this content</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={() => alert("Enroll logic here")}
      >
        Enroll for {price.toLocaleString()} VND
      </button>
    </div>
  );
}
