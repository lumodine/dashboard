"use client";

import {toast} from "react-toastify";
import {Plus} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import createUser from "@/actions/user/createUser";
import {SubmitButton} from "@/components/common/submit-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {USER_ROLES} from "@/constants/user";

export type TenantUserCreateFormProps = {
  tenant: any;
};

export const TenantUserCreateForm = ({tenant}: TenantUserCreateFormProps) => {
  const clientAction = async (formData: FormData) => {
    const response = await createUser(tenant._id, formData);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  return (
    <>
      <form action={clientAction} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">E-posta (*)</Label>
          <Input required id="email" name="email" type="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Rol (*)</Label>
          <Select required name="role">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {USER_ROLES.map((userRole: any, userRoleIndex: number) => (
                <SelectItem key={userRoleIndex} value={userRole.key}>
                  {userRole.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="text-xs">(*) Zorunlu alan</span>
        <SubmitButton>
          <Plus /> Kullanıcı ekle
        </SubmitButton>
      </form>
    </>
  );
};
TenantUserCreateForm.displayName = "TenantUserCreateForm";
