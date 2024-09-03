"use client";
import { CATEGORIES_OPTIONS } from "@/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NumericFormat } from "react-number-format";

export default function HomeClient({ products }) {
  const router = useRouter();
  return (
    <>
      <div className="mb-10 ">
        <Image
          src="/images/banner.jpg"
          alt="banner"
          width="952"
          height="408"
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-4 mt-10">
        <h1 className="font-medium text-lg text-[#0C0D36]">Trend Categories</h1>
        <div className="grid grid-cols-6 gap-8 ">
          {CATEGORIES_OPTIONS.map((item, index) => (
            <div
              key={index}
              className="bg-[#F4F4F4] flex flex-col gap-2 items-center justify-center rounded-sm min-h-[155px]"
            >
              <Image
                src={`/images/ic-${item.icon}.svg`}
                alt="banner"
                width="76"
                height="76"
              />
              <h2 className="text-md text-[#0C0D36]">{item.name}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-10 ">
        <h1 className="font-medium text-lg">New Products</h1>
        <div className="grid grid-cols-4 gap-6 ">
          {products?.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 hover:cursor-pointer"
              onClick={() => router.push(`/product/detail/${item?.id}`)}
            >
              <Image
                src={item?.images[0]?.image_url}
                alt="banner"
                width="200"
                height="200"
                className="w-full"
              />
              <div className="flex flex-col gap-2">
                <h2 className="text-[#0C0D36] font-medium">{item?.name}</h2>
                <p className=" text-[#FF7158]">
                  Rp.{" "}
                  <NumericFormat
                    value={item?.price}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
