"use client";

import { Button } from "@/components/ui/button";
import removeCategory from "@/actions/category/removeCategory";
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

export type RemoveCategoryFormProps = {
    tenant: any;
    category: any;
};

export const RemoveCategoryForm = ({ tenant, category }: RemoveCategoryFormProps) => {
    const clientAction = async () => {
        const response = await removeCategory(tenant._id, category._id);

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
                        <Trash /> Kategoriyi sil
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Kategoriyi sil
                        </DialogTitle>
                    </DialogHeader>
                    <form
                        action={clientAction}
                        className="flex flex-col gap-6"
                    >
                        <p>
                            <b>ÖNEMLİ</b>! Kategoriyi silmeniz sonucunda tüm içeriklerinizi kaybedeceksiniz. Yine de bunu yapmak istiyor musunuz?
                        </p>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="name">
                                Silme işlemini doğrulamak için aşağıdaki kutucuğa "<b>{category.translations[0].name}</b>" yazınız.
                            </Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                required
                                pattern={category.translations[0].name}
                            />
                        </div>
                        <Button
                            variant={"destructive"}
                            type="submit"
                        >
                            <Trash /> Kategoriyi sil
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
RemoveCategoryForm.displayName = "RemoveCategoryForm";
