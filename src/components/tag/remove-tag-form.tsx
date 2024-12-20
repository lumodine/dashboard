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
import removeTag from "@/actions/tag/removeTag";

export type RemoveTagFormProps = {
  tenant: any;
  tag: any;
};

export const RemoveTagForm = ({tenant, tag}: RemoveTagFormProps) => {
  const clientAction = async () => {
    const response = await removeTag(tenant._id, tag._id);

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
            <Trash /> Remove tag
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove tag</DialogTitle>
          </DialogHeader>
          <form action={clientAction} className="flex flex-col gap-6">
            <p>
              <b>IMPORTANT</b>! Removing the tag will result in the loss of all content. Do you
              still want to do this?
            </p>
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">
                Please enter the following box to confirm the removal process: &quot;
                <b>{tag.translations[0].name}</b>&quot;
              </Label>
              <Input
                required
                autoComplete="off"
                id="name"
                name="name"
                pattern={tag.translations[0].name}
                placeholder={tag.translations[0].name}
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
RemoveTagForm.displayName = "RemoveTagForm";
