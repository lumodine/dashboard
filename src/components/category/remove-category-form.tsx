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
            <Trash /> Kategoriyi sil
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kategoriyi sil</DialogTitle>
          </DialogHeader>
          <form action={clientAction} className="flex flex-col gap-6">
            <p>
              <b>ÖNEMLİ</b>! Kategoriyi silmeniz sonucunda tüm içeriklerinizi kaybedeceksiniz. Yine
              de bunu yapmak istiyor musunuz?
            </p>
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">
                Silme işlemini doğrulamak için aşağıdaki kutucuğa &quot;
                <b>{category.translations[0].name}</b>&quot; yazınız.
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
            <Button type="submit" variant={"destructive"}>
              <Trash /> Kategoriyi sil
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
RemoveCategoryForm.displayName = "RemoveCategoryForm";
