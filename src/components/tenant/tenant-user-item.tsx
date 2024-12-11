"use client";

import {Trash} from "lucide-react";
import {toast} from "react-toastify";
import {TableCell, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {USER_ROLES} from "@/constants/user";
import updateUser from "@/actions/user/updateUser";
import deleteUser from "@/actions/user/deleteUser";

export type TenantUserItemProps = {
  tenant: any;
  user: any;
};

export const TenantUserItem = ({tenant, user}: TenantUserItemProps) => {
  const handleUpdateUserRole = async (role: string) => {
    const response = await updateUser(tenant._id, user.user._id, role);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  const handleDeleteUser = async () => {
    const response = await deleteUser(tenant._id, user.user._id);

    if (response.message) {
      toast(response.message, {
        type: response.success ? "success" : "error",
      });
    }
  };

  return (
    <TableRow>
      <TableCell>{user.user.email}</TableCell>
      <TableCell>
        <Select defaultValue={user.role} onValueChange={handleUpdateUserRole}>
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
      </TableCell>
      <TableCell>
        <Button size={"sm"} variant={"destructive"} onClick={handleDeleteUser}>
          <Trash /> Kullanıcıyı Sil
        </Button>
      </TableCell>
    </TableRow>
  );
};
TenantUserItem.displayName = "TenantUserItem";
