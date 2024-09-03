import { z } from "zod";

export const formSignInSchema = z.object({
  email: z
    .string({ required_error: "Email is requied" })
    .email({ message: "Email is not valid" }),
  password: z.string({ required_error: "Password is required" }).min(4),
});

export const formSignUpSchema = z.object({
  email: z
    .string({ required_error: "Email is requied" })
    .email({ message: "Email is not valid" }),
  password: z.string({ required_error: "Password is required" }).min(4),
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name should have minimal 3 characters" }),
});
