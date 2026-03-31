"use client";

import { Bookmark } from "lucide-react";
import React from "react";

const SavedRecipePage = () => {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-1 mb-8">
          <Bookmark className="w-25 h-25 text-orange-600" />
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
              My Saved Recipes
            </h1>
            <p className="text-stone-600">
              Your personal collection of favorite recipes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipePage;
