"use client";
import FormInputLabel from "@/components/FormInputLabel";
import Navbar from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { formSignInSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SetSignin } from "../../../../services/auth";

export default function SigninPage() {
  const { login } = useAuth();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSignInSchema),
  });

  const onSubmit = async (values) => {
    try {
      const response = await SetSignin(values);
      const token = response;
      login(token);
      router.push("/");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };
  return (
    <div className="flex flex-col justify-between">
      <section>
        <Navbar />
      </section>
      <section className="container mx-auto">
        <div className="w-2/3 mx-auto relative pt-20">
          <div className="flex justify-between items-start">
            <div className="w-[298px] h-[396px] border rounded-bl-3xl">
              <div className="w-[294px] h-full rounded-tr-3xl z-50 absolute ml-10 translate-y-[-20px]">
                <Image
                  src={"/images/banner-login.jpg"}
                  alt="banner-login"
                  width={294}
                  height={396}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-start">
              <div className="flex flex-col gap-6">
                <h1 className="text-3xl text-[#0C0D36]">
                  Belanja kebutuhan utama,
                  <br /> menjadi lebih mudah
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
                        onClick={() => router.push("/signup")}
                      >
                        Sign Up
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
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
  );
}
