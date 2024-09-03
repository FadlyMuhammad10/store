"use client";
import React from "react";
import { Separator } from "../ui/separator";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <>
      <div className=" my-10 bottom-0">
        <Separator />
        <div className="container mx-auto  translate-y-[60%] ">
          <p className="text-muted-foreground flex items-center justify-center ">
            2024 Copyright <Heart className="h-4 w-4" />. All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
}
