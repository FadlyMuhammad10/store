"use client";
import BreadcrumbD from "@/components/BreadcrumbD";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useProductDetail from "@/hooks/useProductDetail";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import useCheckStock from "@/hooks/useCheckStock";
import { useAddCart } from "@/hooks/useAddCart";

export default function ProductDetailPage({ params }) {
  const router = useRouter();

  const token = Cookies.get("token");

  const { product, loading, error } = useProductDetail(params.id);

  // check stock product if stock == 0 then disable button
  const isOutOfStock = useCheckStock(product);

  const handleAddToCart = async () => {
    if (!isOutOfStock) {
      await useAddCart(product);
    } else {
      toast.error("Product is out of stock.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <BreadcrumbD page="Product Details" />
      <div className="w-[80%]  my-5">
        <div>
          <Carousel className="w-auto justify-center rounded-sm mb-10">
            <CarouselContent>
              {product.images?.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="p-0">
                        <Image
                          src={item.image_url}
                          alt={item.image_url}
                          width={625}
                          height={400}
                          quality={100}
                          className={"w-full rounded-sm"}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="flex flex-row justify-between">
          <div className="w-2/3 flex flex-col gap-3">
            <div className="">
              <h1 className="text-[#0C0D36] text-2xl">{product.name}</h1>
              <div className="text-sm text-muted-foreground">
                Stock : <span className="text-[#FF7158]">{product.stock}</span>
              </div>
            </div>
            <p className="text-lg text-[#FF7158]">
              Rp.{" "}
              <NumericFormat
                value={product.price}
                displayType={"text"}
                thousandSeparator={true}
              />
            </p>
            <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
          </div>
          <div className="w-auto">
            <Button
              variant="default"
              className=" bg-[#29A867] hover:bg-green-500 font-normal w-[210px]"
              onClick={() => {
                token ? handleAddToCart() : router.push("/signin");
              }}
              disabled={isOutOfStock}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
