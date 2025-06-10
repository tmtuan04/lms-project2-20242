import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getInstructorDetails } from "@/app/lib/data";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract the id from the URL pathname
    const id = request.nextUrl.pathname?.split("/").pop();
    
    if (!id) {
      return NextResponse.json(
        { error: "Instructor ID is required" },
        { status: 400 }
      );
    }

    const instructorDetails = await getInstructorDetails(id);
    return NextResponse.json(instructorDetails);
  } catch (error) {
    console.error("Error in instructor API:", error);
    return NextResponse.json(
      { error: "Failed to fetch instructor details" },
      { status: 500 }
    );
  }
}