"use client";

import {toast} from "react-toastify";
import {Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import removeTenant from "@/actions/tenant/removeTenant";
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

export type RemoveTenantFormProps = {
  tenant: any;
};

export const RemoveTenantForm = ({tenant}: RemoveTenantFormProps) => {
  const clientAction = async () => {
    const response = await removeTenant(tenant._id);

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
            <Trash /> Remove tenant
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove tenant</DialogTitle>
          </DialogHeader>
          <form action={clientAction} className="flex flex-col gap-6">
            <p>
              <b>IMPORTANT</b>! Removing the tenant will result in the loss of all content. Do you
              still want to do this?
            </p>
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">
                Please enter &quot;<b>{tenant.name}</b>&quot; in the box below to confirm the
                removal process.
              </Label>
              <Input
                required
                autoComplete="off"
                id="name"
                name="name"
                pattern={tenant.name}
                placeholder={tenant.name}
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
RemoveTenantForm.displayName = "RemoveTenantForm";
