"use client";

import { Button } from "@/components/ui/button";
import removeTenant from "@/actions/tenant/removeTenant";
import { toast } from "react-toastify";

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
        <form
            action={clientAction}
            className="flex flex-col gap-6 bg-red-400 p-4 rounded-lg"
        >
            <p className="text-white">
                <b>ÖNEMLİ</b>! İşletmeyi silmeniz sonucunda tüm içeriklerinizi kaybedeceksiniz. Yine de bunu yapmak istiyor musunuz?
            </p>
            <Button
                variant={"destructive"}
                type="submit"
                className="w-full"
            >
                Yine de işletmeyi sil
            </Button>
        </form>
    );
};
RemoveTenantForm.displayName = "RemoveTenantForm";
