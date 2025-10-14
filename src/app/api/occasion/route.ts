import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch(`https://flower.elevateegy.com/api/v1/occasions`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },

    });
    const payload = await res.json();
    console.log(payload)
    return NextResponse.json(payload);

}
