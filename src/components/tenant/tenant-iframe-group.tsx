"use client";

import React from "react";

export type TenantIframeGroupProps = {
  children: React.ReactNode;
};

export const TenantIframeGroup = ({children}: TenantIframeGroupProps) => {
  return <div className="flex flex-col gap-6 md:flex-row">{children}</div>;
};
TenantIframeGroup.displayName = "TenantIframeGroup";
