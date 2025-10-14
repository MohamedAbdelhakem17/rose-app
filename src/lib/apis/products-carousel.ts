import { ApiResponse, BestSellerResponse } from './../types/api.types';

// const URL = process.env.NEXT_PUBLIC_API_BASE_UR
export default async function getBestSellingProducts() {
    const res = await fetch(`https://flower.elevateegy.com/api/v1/products`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },

    });

    const payload: ApiResponse<BestSellerResponse> = await res.json()
    // console.log("Full response from API:", payload);

    return payload;
}
