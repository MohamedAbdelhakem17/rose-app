import { ApiResponse, MostPopularResponse } from "../types/api.types";


export default async function getProductsMostPopular() {
    const res = await fetch(`https://flower.elevateegy.com/api/v1/occasions`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const payload: ApiResponse<MostPopularResponse> = await res.json()

    // console.log("response", payload)
    return payload;
}
