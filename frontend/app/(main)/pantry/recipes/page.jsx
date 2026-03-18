"use client";

import { getRecipesByPantryIngredients } from "@/actions/recipe.actions";
import useFetch from "@/hooks/use-fetch";
import React from "react";

const PantryRecipesPage = () => {
  const {
    loading,
    data: recipesData,
    fn: fetchSuggestions,
  } = useFetch(getRecipesByPantryIngredients);

  return <div>PantryRecipesPage</div>;
};

export default PantryRecipesPage;
