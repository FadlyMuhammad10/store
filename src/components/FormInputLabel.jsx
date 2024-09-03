import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export default function FormInputLabel({
  form,
  name,
  label,
  type,
  placeholder,
}) {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#0C0D36]">{label}</FormLabel>
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className="rounded-none w-full focus:outline-none border-[#7186A0] focus:text-black"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
