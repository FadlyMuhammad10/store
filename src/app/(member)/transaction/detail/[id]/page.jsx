"use client";

import FieldOrderDetail from "@/components/FieldOrderDetail";
import HeaderMember from "@/components/layouts/HeaderMember";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCarts from "@/hooks/useCarts";
import useCompleteShippment from "@/hooks/useCompleteShippment";
import useOrderDetail from "@/hooks/useOrderDetail";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

export default function TransactionDetailPage({ params }) {
  const [user, setUser] = useState({});

  const { carts } = useCarts();
  const { completed } = useCompleteShippment();

  const { order, loading, error } = useOrderDetail(params.id);

  const router = useRouter();

  // check status shippment complete
  const disabledButton = () => {
    if (order.status_shipment === "completed") {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = token;
      const payload = jwtDecode(jwtToken);
      setUser(payload);
    } else {
      router.push("/signin");
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="flex flex-row mb-5 justify-between items-start">
        <HeaderMember
          title={"Transaction Detail"}
          subTitle={"Big result start from the small one"}
          user={user}
          carts={carts}
        />
      </div>
      <div className="relative my-5 h-[85vh] overflow-auto bg-white rounded-md">
        <div className=" w-[85%] mx-auto  my-10">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-3 capitalize">
              <Image
                src={order.cart.product.images[0].image_url}
                alt="avatar"
                width="230"
                height="500"
                className="rounded-lg w-[230px] h-[230px]"
              />

              <div className="flex flex-col justify-between">
                <FieldOrderDetail title={"Customer Name"} value={order.name} />
                <FieldOrderDetail
                  title={"Date Transaction"}
                  value={order.date}
                />
                <div className="flex flex-col gap-2">
                  <h1 className="text-muted-foreground">Total Amount</h1>
                  <div className="font-semibold text-[#0C0D36]">
                    <NumericFormat
                      value={order.gross_amount}
                      displayType={"text"}
                      prefix={"Rp. "}
                      thousandSeparator={true}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between capitalize">
                <FieldOrderDetail
                  title={"Product Name"}
                  value={order.cart.product.name}
                />

                <div className="flex flex-col gap-2">
                  <h1 className="text-muted-foreground">Status Payment</h1>
                  {order.status === "pending" ? (
                    <div className="font-semibold text-[#F32355]">
                      {order.status}
                    </div>
                  ) : (
                    <div className="font-semibold text-[#00C48C]">
                      {order.status}
                    </div>
                  )}
                </div>

                {order.user?.phone ? (
                  <FieldOrderDetail title={"Phone"} value={order.user?.phone} />
                ) : (
                  <FieldOrderDetail title={"Phone"} value={"-"} />
                )}
              </div>
            </div>
            <div className="w-2/3">
              <h1 className="text-[#0C0D36] font-medium">
                Shipping Information
              </h1>
              <div className="grid grid-cols-2 mt-5">
                <div className="flex flex-col gap-5">
                  <FieldOrderDetail
                    title={"Province"}
                    value={order.destination_province_name}
                  />
                  <FieldOrderDetail
                    title={"Postcode"}
                    value={order.destination_postal_code}
                  />
                  <FieldOrderDetail title={"Receipt"} value={order.receipt} />
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="status_shipment"
                      className="text-muted-foreground font-normal"
                    >
                      Status Shipping
                    </Label>
                    <Select>
                      <SelectTrigger
                        id="status_shipment"
                        className="w-[40%] capitalize"
                      >
                        <SelectValue placeholder={order.status_shipment} />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <FieldOrderDetail
                    title={"City"}
                    value={order.destination_city_name}
                  />
                  <FieldOrderDetail title={"Country"} value={"Indonesia"} />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="default"
                className=" bg-[#29A867] hover:bg-green-500 font-normal"
                onClick={() =>
                  completed(params.id).then(() => router.refresh())
                }
                disabled={disabledButton()}
              >
                Completed Shipping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
