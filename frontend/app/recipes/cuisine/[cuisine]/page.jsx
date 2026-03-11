"use client";

import { getMealsByArea, getMealsByCategory } from "@/actions/mealdb.actions";
import RecipeGrid from "@/components/RecipeGrid";
import { useParams } from "next/navigation";

export default function CuisineRecipespage() {
  const params = useParams();
  const cuisine = params.cuisine;

  <RecipeGrid
    type="cuisine"
    value={cuisine}
    fetchAction={getMealsByArea}
    backLink="/dashboard"
  />;
}
