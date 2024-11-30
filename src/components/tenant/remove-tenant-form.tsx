"use client";

import { Button } from "@/components/ui/button";
import removeTenant from "@/actions/tenant/removeTenant";
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

export type RemoveTenantFormProps = {
    tenant: any;
};

export const RemoveTenantForm = ({ tenant }: RemoveTenantFormProps) => {
    const clientAction = async () => {
        const response = await removeTenant(tenant._id);

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
                        <Trash /> İşletmeyi sil
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            İşletmeyi sil
                        </DialogTitle>
                    </DialogHeader>
                    <form
                        action={clientAction}
                        className="flex flex-col gap-6"
                    >
                        <p>
                            <b>ÖNEMLİ</b>! İşletmeyi silmeniz sonucunda tüm içeriklerinizi kaybedeceksiniz. Yine de bunu yapmak istiyor musunuz?
                        </p>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="name">
                                Silme işlemini doğrulamak için aşağıdaki kutucuğa "<b>{tenant.name}</b>" yazınız.
                            </Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder={tenant.name}
                                pattern={tenant.name}
                            />
                        </div>
                        <Button
                            variant={"destructive"}
                            type="submit"
                        >
                            <Trash /> İşletmeyi sil
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
RemoveTenantForm.displayName = "RemoveTenantForm";
