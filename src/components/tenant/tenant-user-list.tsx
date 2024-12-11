"use client";

import {TenantUserItem} from "./tenant-user-item";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export type TenantUserListProps = {
  tenant: any;
  users: any[];
};

export const TenantUserList = ({tenant, users}: TenantUserListProps) => {
  const count = users?.length || 0;
  const hasUsers = count > 0;

  if (!hasUsers) {
    return <p className="text-sm text-muted-foreground">Henüz kullanıcı eklenmemiş.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>E-posta</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead>İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: any, userIndex: number) => (
          <TenantUserItem key={userIndex} tenant={tenant} user={user} />
        ))}
      </TableBody>
    </Table>
  );
};
TenantUserList.displayName = "TenantUserList";
