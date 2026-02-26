import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "roadmap-data.json");

export async function GET() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Read error:", err);
    return NextResponse.json(
      { error: "Failed to load roadmap data" },
      { status: 500 }
    );
  }
}
