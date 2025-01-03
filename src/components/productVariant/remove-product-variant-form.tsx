"use client";

import {toast} from "react-toastify";
import {Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {SubmitButton} from "@/components/common/submit-button";
import removeProductVariant from "@/actions/productVariant/removeProductVariant";

export type RemoveProductVariantFormProps = {
  tenant: any;
  category: any;
  product: any;
  variant: any;
};

export const RemoveProductVariantForm = ({
  tenant,
  category,
  product,
  variant,
}: RemoveProductVariantFormProps) => {
  const clientAction = async () => {
    const response = await removeProductVariant(tenant._id, category._id, product._id, variant._id);

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
            <Trash /> Remove product variant
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove product variant</DialogTitle>
          </DialogHeader>
          <form action={clientAction} className="flex flex-col gap-6">
            <p>
              <b>IMPORTANT</b>! Removing the product variant will result in the loss of all content.
              Do you still want to do this?
            </p>
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">
                Please enter the following box to confirm the removal process: &quot;
                <b>{variant.translations[0].title}</b>&quot;
              </Label>
              <Input
                required
                autoComplete="off"
                id="name"
                name="name"
                pattern={variant.translations[0].title}
                placeholder={variant.translations[0].title}
                type="text"
              />
            </div>
            <div className="flex justify-center items-center gap-2">
              <DialogClose asChild>
                <Button className="flex-1 w-full" type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <SubmitButton className="w-auto" variant={"destructive"}>
                <Trash />
              </SubmitButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
RemoveProductVariantForm.displayName = "RemoveProductVariantForm";
