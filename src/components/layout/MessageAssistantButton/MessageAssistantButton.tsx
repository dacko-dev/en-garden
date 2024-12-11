import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import React from "react";

export default function MessageAssistantButton() {
  return (
    <Button
      size={"icon"}
      variant={"outline"}
      className="rounded-full fixed bottom-20 right-14"
    >
      <MessageCircle />
    </Button>
  );
}
