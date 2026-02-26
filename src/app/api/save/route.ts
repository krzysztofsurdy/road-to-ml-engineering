import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "roadmap-data.json");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { taskId, done } = body as { taskId: string; done: boolean };

    if (!taskId || typeof done !== "boolean") {
      return NextResponse.json(
        { error: "Missing taskId or done field" },
        { status: 400 }
      );
    }

    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const data = JSON.parse(raw);

    let updated = false;
    for (const phase of data.phases) {
      for (const week of phase.weeks_detail) {
        for (const task of week.tasks) {
          if (task.id === taskId) {
            task.done = done;
            updated = true;
          }
        }
      }
    }

    if (!updated) {
      return NextResponse.json(
        { error: `Task ${taskId} not found` },
        { status: 404 }
      );
    }

    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true, taskId, done });
  } catch (err) {
    console.error("Save error:", err);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 }
    );
  }
}
