"use client";
import ActionButton from "@/components/ActionButton/ActionButton";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

export default function ActionButtonHeader() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }
  return <ActionButton />;
}
