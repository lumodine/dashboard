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
            <Trash /> Ürünü sil
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ürünü sil</DialogTitle>
          </DialogHeader>
          <form action={clientAction} className="flex flex-col gap-6">
            <p>
              <b>ÖNEMLİ</b>! Ürünü silmeniz sonucunda tüm içeriklerinizi kaybedeceksiniz. Yine de
              bunu yapmak istiyor musunuz?
            </p>
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">
                Silme işlemini doğrulamak için aşağıdaki kutucuğa &quot;
                <b>{product.translations[0].name}</b>&quot; yazınız.
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
              <Trash /> Ürünü sil
            </SubmitButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
RemoveProductForm.displayName = "RemoveProductForm";
