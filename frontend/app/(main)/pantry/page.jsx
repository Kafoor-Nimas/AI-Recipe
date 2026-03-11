import { Package } from "lucide-react";
import React from "react";

const Pantrypage = () => {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Package className="w-16 h-16 text-orange-600" />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
                  My Pantry
                </h1>
                <p className="text-stone-600 font-light">
                  manage your ingredients and discover what you can cook
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pantrypage;
