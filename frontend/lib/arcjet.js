import arcjet from "@arcjet/next";

export const aj=arcjet({
    key:process.env.NEXT_PUBLIC_ARCJET_KEY,
})

// Free tier pantry scan limits (10 scans per month)

// Free tier meal recommendations (5 per month)

// Pro tier - effectively unlimited (very high limits)

// 1000 requests per day should be more than enough for any user