import arcjet, { tokenBucket } from "@arcjet/next";

export const aj=arcjet({
    key:process.env.NEXT_PUBLIC_ARCJET_KEY,
})

// Free tier pantry scan limits (10 scans per month)
export const freePantryScans = aj.withRule(
    tokenBucket({
        mode:"LIVE",
        characteristics:["userId"],
        refillRate:10,
        interval:"30d",
        capacity:10
    })
)

// Free tier meal recommendations (5 per month)
export const freeMealRecommendations = aj.withRule(
    tokenBucket({
        mode:"LIVE",
        characteristics:["userId"],
        refillRate:5,
        interval:"30d",
        capacity:5
    })
)

// Pro tier - effectively unlimited (very high limits)

// 1000 requests per day should be more than enough for any user