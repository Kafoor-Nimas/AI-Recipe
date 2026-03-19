import Link from "next/link";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "./ui/card";

import Image from "next/image";
import { Badge } from "./ui/badge";

const RecipeCard = ({ recipe, variant = "default" }) => {
  const getRecipeData = () => {
    // For MealDB recipes (category/cuisine pages)

    if (recipe.strMeal) {
      return {
        title: recipe.strMeal,
        image: recipe.strMealThumb,
        href: `/recipe?cook=${encodeURIComponent(recipe.strMeal)}`,
        showImage: true,
      };
    }

    // For-AI-generated pantry recipes
    if (recipe.matchPercentage) {
      return {
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        cuisine: recipe.cuisine,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        matchPercentage: recipe.matchPercentage,
        missingIngredients: recipe.missingIngredients || [],
        image: recipe.imageUrl, //Add image support
        href: `/recipe?cook=${encodeURIComponent(recipe.title)}`,
        showImage: !!recipe.imageUrl, //Show if image exists
      };
    }

    // more conditions
    return {};
  };

  const data = getRecipeData();

  // Add grid variant
  if (variant === "grid") {
    return (
      <Link href={data.href}>
        <Card
          className={
            "rounded-none overflow-hidden border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group pt-0"
          }
        >
          {data.showImage ? (
            <div className="relative aspect-square">
              <Image
                alt={data.title}
                src={data.image}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">
                    Click to view recipe
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <CardHeader>
            <CardTitle
              className={
                "text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2"
              }
            >
              {data.title}
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
    );
  }

  // Add pantry variant
  if (variant === "pantry") {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {data.cuisine && (
                  <Badge
                    variant="outline"
                    className={"text-orange-600 border-orange-200 capitalize"}
                  >
                    {data.cuisine}
                  </Badge>
                )}
                {data.category && (
                  <Badge
                    variant="outline"
                    className={"text-stone-600 border-stone-200 capitalize"}
                  >
                    {data.category}
                  </Badge>
                )}
              </div>
            </div>

            {/* Match Percentage Badge */}
            {data.matchPercentage && (
              <div className="flex flex-col items-end gap-1">
                <Badge
                  className={`${data.matchPercentage >= 90 ? "bg-green-600" : data.matchPercentage >= 75 ? "bg-orange-600" : "bg-stone-600"} text-white text-lg px-3 py-1`}
                >
                  {data.matchPercentage}%
                </Badge>
                <span className="text-xs text-stone-500">Match</span>
              </div>
            )}
          </div>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    );
  }

  return <div>RecipeCard</div>;
};

export default RecipeCard;
