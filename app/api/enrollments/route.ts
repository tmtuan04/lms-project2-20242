import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST: Enroll in a course
export async function POST(req: Request) {
    const { userId, courseId } = await req.json();

    if (!userId || !courseId) {
        return NextResponse.json({ success: false, message: "Thiếu thông tin." }, { status: 400 });
    }

    try {
        await prisma.courseEnrollment.create({
            data: {
                userId,
                courseId,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        const err = error as Error;
        console.log(err.message);
        return NextResponse.json({ success: false, message: "Đã có lỗi xảy ra." }, { status: 500 });
    }
}