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
    return <p className="text-sm text-muted-foreground">No users added yet.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead>Name Surname</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: any, userIndex: number) => (
          <TenantUserItem key={userIndex} index={userIndex} tenant={tenant} user={user} />
        ))}
      </TableBody>
    </Table>
  );
};
TenantUserList.displayName = "TenantUserList";
