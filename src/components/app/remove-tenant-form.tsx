"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import removeTenant from "@/actions/tenant/removeTenant";

export type RemoveTenantFormProps = {
    tenant: any;
};

export const RemoveTenantForm = ({ tenant }: RemoveTenantFormProps) => {
    const toast = useToast();

    const clientAction = async () => {
        const response = await removeTenant(tenant._id);

        if (response.message) {
            toast.toast({
                variant: response.success ? "default" : "destructive",
                description: response.message
            });
        }
    }

    return (
        <form
            action={clientAction}
            className="flex flex-col gap-6 bg-red-400 p-4 rounded-lg"
        >
            <p className="text-white">
                <b>ÖNEMLİ</b>! İşletmeyi silmeniz sonucunda tüm içeriklerinizi kaybedeceksiniz.
            </p>
            <Button type="submit" className="w-full">
                Yine de işletmeyi sil
            </Button>
        </form>
    );
};
