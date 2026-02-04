import { NextResponse } from "next/server";
import { seedData, mockAi } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    seed: seedData,
    ai: mockAi
  });
}
