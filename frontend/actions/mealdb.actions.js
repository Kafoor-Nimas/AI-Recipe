"use server";

const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1";

export async function getRecipeOfTheDay() {
  try {
    const response = await fetch(`${MEALDB_BASE}/random.php`, {
      next: { revalidate: 86400 }, //Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error("failed to fetch recipe of the day");
    }

    const data = await response.json();

    return {
      success: true,
      recipe: data.meals[0],
    };
  } catch (error) {
    console.error("Error fetching recipe of the day:", error);
    throw new Error(error.message || "failed to load recipe");
  }
}

export async function getCategories() {}

export async function getAreas() {}

export async function getMealsByCategory(category) {}

export async function getMealsByArea(area) {}
