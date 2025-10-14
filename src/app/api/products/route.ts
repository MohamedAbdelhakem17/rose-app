
import { ApiResponse, BestSellerResponse } from "@/lib/types/api.types";

export async function GET() {
    const res = await fetch(`https://flower.elevateegy.com/api/v1/products`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const payload: ApiResponse<BestSellerResponse> = await res.json();
    console.log(payload)
    return Response.json(payload.products);
}