"use client";

import { Button } from "@/components/ui/button";
import removeProduct from "@/actions/product/removeProduct";
import { toast } from "react-toastify";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";

export type RemoveProductFormProps = {
    tenant: any;
    category: any;
    product: any;
};

export const RemoveProductForm = ({ tenant, category, product }: RemoveProductFormProps) => {
    const clientAction = async () => {
        const response = await removeProduct(tenant._id, category._id, product._id);

        if (response.message) {
            toast(response.message, {
                type: response.success ? "success" : "error",
            });
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant={"destructive"}
                        type="button"
                        className="w-full"
                    >
                        <Trash /> Ürünü sil
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Ürünü sil
                        </DialogTitle>
                    </DialogHeader>
                    <form
                        action={clientAction}
                        className="flex flex-col gap-6"
                    >
                        <p>
                            <b>ÖNEMLİ</b>! Ürünü silmeniz sonucunda tüm içeriklerinizi kaybedeceksiniz. Yine de bunu yapmak istiyor musunuz?
                        </p>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="name">
                                Silme işlemini doğrulamak için aşağıdaki kutucuğa "<b>{product.translations[0].name}</b>" yazınız.
                            </Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder={product.translations[0].name}
                                pattern={product.translations[0].name}
                            />
                        </div>
                        <Button
                            variant={"destructive"}
                            type="submit"
                        >
                            <Trash /> Ürünü sil
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
RemoveProductForm.displayName = "RemoveProductForm";
