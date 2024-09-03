"use client";
import Navbar from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SetSignup } from "../../../../services/auth";
import { Form } from "@/components/ui/form";
import FormInputLabel from "@/components/FormInputLabel";
import { formSignUpSchema } from "@/lib/form-schema";

export default function SignupPage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSignUpSchema),
  });

  const onSubmit = async (values) => {
    try {
      await SetSignup(values);
      toast.success("Account created successfully");
      router.push("/signin");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };
  return (
    <>
      <div className="flex flex-col justify-between">
        <section>
          <Navbar />
        </section>
        <section className="container mx-auto">
          <div className="flex items-center justify-center">
            <div className="flex justify-start">
              <div className="flex flex-col gap-6">
                <h1 className="text-3xl text-[#0C0D36]">
                  Memulai untuk jual beli <br />
                  dengan cara terbaru
                </h1>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 text-black"
                  >
                    <div className="flex flex-col gap-4 w-[270px]">
                      <div className="flex flex-col gap-2">
                        <FormInputLabel
                          form={form}
                          name={"name"}
                          label={"Full Name"}
                          type={"text"}
                          placeholder={"Full Name"}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <FormInputLabel
                          form={form}
                          name={"email"}
                          label={"Email Address"}
                          type={"email"}
                          placeholder={"Email Address"}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <FormInputLabel
                          form={form}
                          name={"password"}
                          label={"Password"}
                          type={"password"}
                          placeholder={"Password"}
                        />
                      </div>
                    </div>

                    <div className="w-[270px] flex flex-col gap-4">
                      <Button
                        variant="default"
                        className=" bg-[#29A867] hover:bg-green-400 font-normal "
                      >
                        Sign In to My Account
                      </Button>
                      <Button
                        variant="secondary"
                        className=" bg-[#F3F3F3] text-[#BBBBBB] font-normal "
                        onClick={() => router.push("/signin")}
                      >
                        Sign In
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>

        <section className="translate-y-[230px]">
          <Separator />
          <div className=" my-10 relative translate-x-[10%] ">
            <div className="container absolute bottom-0   ">
              <p className="text-muted-foreground flex items-center justify-center ">
                2019 Copyright Store. All Rights Reserved
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
