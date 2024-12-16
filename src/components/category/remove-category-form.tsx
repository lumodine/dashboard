"use client";

import {toast} from "react-toastify";
import {Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import removeCategory from "@/actions/category/removeCategory";
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

export type RemoveCategoryFormProps = {
  tenant: any;
  category: any;
};

export const RemoveCategoryForm = ({tenant, category}: RemoveCategoryFormProps) => {
  const clientAction = async () => {
    const response = await removeCategory(tenant._id, category._id);

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
            <Trash /> Remove category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove category</DialogTitle>
          </DialogHeader>
          <form action={clientAction} className="flex flex-col gap-6">
            <p>
              <b>IMPORTANT</b>! Removing the category will result in the loss of all content. Do
              you still want to do this?
            </p>
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">
                Please enter the following box to confirm the removal process: &quot;
                <b>{category.translations[0].name}</b>&quot;
              </Label>
              <Input
                required
                id="name"
                name="name"
                pattern={category.translations[0].name}
                placeholder={category.translations[0].name}
                type="text"
              />
            </div>
            <SubmitButton variant={"destructive"}>
              <Trash /> Remove category
            </SubmitButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
RemoveCategoryForm.displayName = "RemoveCategoryForm";
