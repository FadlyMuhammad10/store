"use client";
import BreadcrumbD from "@/components/BreadcrumbD";
import DialogCheckout from "@/components/DialogCheckout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CARTS_COLUMNS } from "@/constants";
import useCarts from "@/hooks/useCarts";
import useMidtransCheckout from "@/hooks/useMidtransCheckout";
import useRemoveCart from "@/hooks/useRemoveCart";
import Image from "next/image";
import { NumericFormat } from "react-number-format";

export default function CartsPage() {
  const { carts, loading, error } = useCarts();

  const { removeCart } = useRemoveCart();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <BreadcrumbD page="Carts" />

      <div className="relative my-5 min-h-screen overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {CARTS_COLUMNS.map((item, i) => (
                <TableHead key={i}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {carts?.map((item, i) => (
              <>
                <TableRow key={item.id}>
                  <TableCell className="font-medium inline-flex items-center">
                    <Image
                      src={item?.product?.images[0]?.image_url}
                      alt={item?.product?.images[0]?.image_url}
                      width={160}
                      height={85}
                      className="rounded-sm"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {item?.product?.name}
                  </TableCell>
                  <TableCell className="font-medium text-[#FF7158]">
                    Rp.{" "}
                    <NumericFormat
                      value={item?.product?.price}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                  </TableCell>
                  <TableCell className="flex flex-row gap-5">
                    <Button
                      variant="default"
                      className=" bg-[#FC5E84] hover:bg-[#FC5E84] font-normal "
                      onClick={() => removeCart(item.id)}
                    >
                      Remove
                    </Button>
                    <DialogCheckout item={item} />
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
