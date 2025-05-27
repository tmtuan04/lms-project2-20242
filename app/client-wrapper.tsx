"use client";

import { useEffect } from "react";
import { useUserStore } from "./stores/useUserStore";
import { useAuth } from "@clerk/nextjs";

export default function ClientWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = useAuth();
    const fetchUser = useUserStore((s) => s.fetchUser);

    useEffect(() => {
        if (userId) fetchUser(userId);
    }, [fetchUser, userId]);

    return <>{children}</>;
}