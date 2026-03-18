"use client";

import { getRecipesByPantryIngredients } from "@/actions/recipe.actions";
import useFetch from "@/hooks/use-fetch";
import { ArrowLeft, ChefHat } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

const PantryRecipesPage = () => {
  const {
    loading,
    data: recipesData,
    fn: fetchSuggestions,
  } = useFetch(getRecipesByPantryIngredients);

  // Load suggestions on mount
  useEffect(() => {
    fetchSuggestions();
  }, []);

  const recipes = recipesData?.recipes || [];
  const ingredientsUsed = recipesData?.ingredientsUsed || "";

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href={"/pantry"}
            className="inline-flex items-center gap-2 text-stone-600 hover:text-orange-600 transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pantry
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <ChefHat className="w-16 h-16 text-green-600" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
                What Can I Cook
              </h1>
              <p className="text-stone-600 font-light">
                AI-powered recipe suggestions based on your pantry
              </p>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default PantryRecipesPage;
