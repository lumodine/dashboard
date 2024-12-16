"use client";

import {toast} from "react-toastify";
import {Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import removeProduct from "@/actions/product/removeProduct";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {SubmitButton} from "@/components/common/submit-button";

export type RemoveProductFormProps = {
  tenant: any;
  category: any;
  product: any;
};

export const RemoveProductForm = ({tenant, category, product}: RemoveProductFormProps) => {
  const clientAction = async () => {
    const response = await removeProduct(tenant._id, category._id, product._id);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" type="button" variant={"destructive"}>
            <Trash /> Remove product
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove product</DialogTitle>
          </DialogHeader>
          <form action={clientAction} className="flex flex-col gap-6">
            <p>
              <b>IMPORTANT</b>! Removing the product will result in the loss of all content. Do
              you still want to do this?
            </p>
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">
                Please enter the following box to confirm the removal process: &quot;
                <b>{product.translations[0].name}</b>&quot;
              </Label>
              <Input
                required
                id="name"
                name="name"
                pattern={product.translations[0].name}
                placeholder={product.translations[0].name}
                type="text"
              />
            </div>
            <SubmitButton variant={"destructive"}>
              <Trash /> Remove product
            </SubmitButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
RemoveProductForm.displayName = "RemoveProductForm";
