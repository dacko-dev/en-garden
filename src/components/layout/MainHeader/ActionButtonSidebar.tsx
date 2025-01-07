"use client";

import ActionButton from "@/components/ActionButton/ActionButton";

import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

export default function ActionButtonSidebar() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <ActionButton />;
  }
  return null;
}
