"use client";

import { getRecipesByPantryIngredients } from "@/actions/recipe.actions";
import useFetch from "@/hooks/use-fetch";
import { ArrowLeft, ChefHat, Package } from "lucide-react";
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

          {/* Ingredients Used for generating this reciped */}
          {ingredientsUsed && (
            <div className="bg-white p-4 border-stone-200 mb-4">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">
                    Your Available Ingredients:
                  </h3>
                  <p className="text-stone-600 text-sm font-light">
                    {ingredientsUsed}
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* Usage state sending from backend */}
        </div>
      </div>
    </div>
  );
};

export default PantryRecipesPage;
