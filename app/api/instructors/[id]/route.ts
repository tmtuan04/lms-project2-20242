import { NextResponse } from "next/server";
import { getInstructorDetails } from "@/app/lib/data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const instructorId = params.id;
    const instructorDetails = await getInstructorDetails(instructorId);
    
    return NextResponse.json(instructorDetails);
  } catch (error) {
    console.error("Error in instructor API:", error);
    return NextResponse.json(
      { error: "Failed to fetch instructor details" },
      { status: 500 }
    );
  }
} 