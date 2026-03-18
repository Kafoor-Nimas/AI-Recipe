"use server";

import { freeMealRecommendations, proTierLimit } from "@/lib/arcjet";
import { checkUser } from "@/lib/checkUser";
import { request } from "@arcjet/next";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function getRecipesByPantryIngredients() {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const isPro = user.subscriptionTier === "pro";

    // Apply Arcjet rate limit based on tier
    const arcjetClient = isPro ? proTierLimit : freeMealRecommendations;

    //create a request object for Arcjet
    const req = await request();

    const decision = await arcjetClient.protect(req, {
      userId: user.clerkId,
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new Error(
          `Monthly scan limit reached. ${isPro ? "Please contact support if you need more scans" : "Upgrade to Pro for unlimited scans"}`,
        );
      }

      throw new Error("Request denied by security system");
    }

    // Get user's pantry items
    const pantryResponse = await fetch(
      `${STRAPI_URL}/api/pantry-items?filters[owner][id][$eq]=${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        cache: "no-store",
      },
    );

    if (!pantryResponse.ok) {
      throw new Error("Failed to fetch pantry items");
    }

    const pantryData = await pantryResponse.json();

    if (!pantryData.data || pantryData.data.length === 0) {
      return {
        success: false,
        message: "Your pantry is empty. Add ingredients first!",
      };
    }

    const ingredients = pantryData.data.map((item) => item.name).join(", ");
  } catch (error) {}
}
