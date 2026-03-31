"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChefHat } from "lucide-react";
import { useRouter } from "next/navigation";

const HowToCookModal = () => {
  const router = useRouter();
  const [recipeName, setRecipeName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      setRecipeName(""); //Reset input when closing
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="hover:text-orange-600 transition-colors flex items-center gap-1.5 text-sm font-medium text-stone-600">
          <ChefHat className="w-4 h-4" />
          How to Cook?
        </button>
      </DialogTrigger>
      <DialogContent className={"max-w-lg"}>
        <DialogHeader>
          <DialogTitle
            className={"text-2xl font-serif font-bold flex items-center gap-2"}
          >
            <ChefHat className="w-6 h-6 text-orange-600" />
            How to Cook?
          </DialogTitle>
          <DialogDescription>
            Enter any recipe name and our AI chef will guide you through the
            cooking process
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HowToCookModal;
