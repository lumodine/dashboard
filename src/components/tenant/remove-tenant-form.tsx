"use client";

import {toast} from "react-toastify";
import {Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import removeTenant from "@/actions/tenant/removeTenant";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

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
            <Trash /> İşletmeyi sil
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>İşletmeyi sil</DialogTitle>
          </DialogHeader>
          <form action={clientAction} className="flex flex-col gap-6">
            <p>
              <b>ÖNEMLİ</b>! İşletmeyi silmeniz sonucunda tüm içeriklerinizi kaybedeceksiniz. Yine
              de bunu yapmak istiyor musunuz?
            </p>
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">
                Silme işlemini doğrulamak için aşağıdaki kutucuğa &quot;<b>{tenant.name}</b>&quot;
                yazınız.
              </Label>
              <Input
                required
                id="name"
                name="name"
                pattern={tenant.name}
                placeholder={tenant.name}
                type="text"
              />
            </div>
            <Button type="submit" variant={"destructive"}>
              <Trash /> İşletmeyi sil
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
RemoveTenantForm.displayName = "RemoveTenantForm";
