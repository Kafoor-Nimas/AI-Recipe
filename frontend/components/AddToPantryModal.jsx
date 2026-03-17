"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Loader2, Plus } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { addPantryItemManually, saveToPantry } from "@/actions/pantry.actions";
import { Button } from "./ui/button";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";

const AddToPantryModal = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState("scan");
  const [selectedImage, setSelectedImage] = useState(null);
  const [scannedIngredients, setScanIngredients] = useState([]);
  const [manualItem, setManualItem] = useState({ name: "", quantity: "" });

  // Scan image
  const {
    loading: scanning,
    data: scanData,
    fn: scanImage,
  } = useFetch(saveToPantry);

  // Save scanned items
  const {
    loading: saving,
    data: saveData,
    fn: saveScannedItems,
  } = useFetch(saveToPantry);

  // Add manual item
  const {
    loading: adding,
    data: addData,
    fn: addManualItem,
  } = useFetch(addPantryItemManually);

  // Handle manual add success
  useEffect(() => {
    if (addData?.success) {
      toast.success("Item added to pantry!");
      setManualItem({ name: "", quantity: "" });
      handleClose();
      if (onSuccess) onSuccess();
    }
  }, [addData]);

  const handleClose = () => {
    setActiveTab("scan");
    setSelectedImage(null);
    setScanIngredients([]);
    setManualItem({ name: "", quantity: "" });
    onClose();
  };

  // Handle Image selection
  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setScanIngredients([])
  }

  const handleAddManual = async (e) => {
    e.preventDefault();
    if (!manualItem.name.trim() || !manualItem.quantity.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", manualItem.name);
    formData.append("quantity", manualItem.quantity);
    await addManualItem(formData);
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={"text-2xl font-bold tracking-tight"}>
            Add to Pantry
          </DialogTitle>
          <DialogDescription>
            Scan your pantry with AI or add items manually
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className={"mt-4"}>
          <TabsList className={"grid w-full grid-cols-2"}>
            <TabsTrigger value="scan" className={"gap-2"}>
              <Camera className="w-4 h-4" />
              AI Scan
            </TabsTrigger>
            <TabsTrigger value="manual" className={"gap-2"}>
              <Plus className="w-4 h-4" />
              Add Manually
            </TabsTrigger>
          </TabsList>
          <TabsContent value="scan" className={"space-y-6 mt-6"}>
            {scannedIngredients.length === 0 ? <div className="space-y-4">
              {/* Image uploader */}
              <ImageUploader onImageSelect={handleImageSelect} loading={scanning}/>
            </div> : <div></div>}
          </TabsContent>
          <TabsContent value="manual" className={"mt-6"}>
            <form onSubmit={handleAddManual} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  value={manualItem.name}
                  onChange={(e) => {
                    setManualItem({ ...manualItem, name: e.target.value });
                  }}
                  placeholder="e.g., Chicken breast"
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={adding}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  value={manualItem.quantity}
                  onChange={(e) => {
                    setManualItem({ ...manualItem, quantity: e.target.value });
                  }}
                  placeholder="e.g., 500g, 2 cups, 3 pieces"
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={adding}
                />
              </div>

              <Button
                type="submit"
                disabled={adding}
                variant="primary"
                className={"flex-1 h-12 w-full"}
              >
                {adding ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Item
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddToPantryModal;
