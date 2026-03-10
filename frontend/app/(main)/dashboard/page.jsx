import {
  getAreas,
  getCategories,
  getRecipeOfTheDay,
} from "@/actions/mealdb.actions";
import React from "react";

const page = async () => {
  const recipeData = await getRecipeOfTheDay();
  const categoriesData = await getCategories();
  const areasData = await getAreas();

  const recipeOfTheDay = recipeData?.recipe;
  const categories = categoriesData?.categories || [];
  const areas = areasData?.areas || [];

  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-5">
          <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-4 tracking-tight leading-tight">
            Fresh Recipes, Servd Daily 🔥
          </h1>
          <p className="text-xl text-stone-600 font-light max-w-2xl">
            Discover thousands of recipes from around the world. Cook, create,
            and savor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
