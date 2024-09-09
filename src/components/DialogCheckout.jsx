"use client";
import useCity from "@/hooks/useCity";
import useMidtransCheckout from "@/hooks/useMidtransCheckout";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import axios from "../configs/axios";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function DialogCheckout({ item }) {
  const { city, loading, error } = useCity();

  const { checkoutCart, isLoading } = useMidtransCheckout();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedCity, setSelectedCity] = useState(() => {
    // Mengambil dari cookie
    return Cookies.get("city");
  });

  const [shippingCost, setShippingCost] = useState(0);
  const [grossAmount, setGrossAmount] = useState(0);

  const handleCityChange = (value) => {
    setSelectedCity(value);
    // Simpan ke cookie
    Cookies.set("city", value);
  };

  useEffect(() => {
    const tokenCookies = Cookies.get("token");
    if (selectedCity && tokenCookies) {
      // Panggil API RajaOngkir untuk menghitung ongkir
      const fetchShippingCost = async () => {
        try {
          const response = await axios.post(
            "/api/rajaongkir/shipping-cost",
            {
              origin: 249, // ID kota asal (sesuaikan)
              destination: Number(selectedCity), // ID kota tujuan
              weight: 100, // Berat produk dalam gram
              courier: "jne", // Kurir yang digunakan (jne, pos, tiki, dll.)
            },
            {
              headers: {
                Authorization: `Bearer ${tokenCookies}`, // Token yang diberikan oleh RajaOngkir
              },
            }
          );

          const cost = response;
          setShippingCost(cost);

          // Update gross amount (harga produk + ongkos kirim)
          setGrossAmount(Number(item?.product?.price) + Number(cost));
        } catch (error) {
          console.error("Error fetching shipping cost:", error);
        }
      };

      fetchShippingCost();
    }
  }, [selectedCity]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className=" bg-[#29A867] hover:bg-[#29A867] font-normal"
            disabled={item?.product?.stock <= 0}
          >
            Checkout
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ringkasan Belanja</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="city"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                City
              </Label>
              <Select onValueChange={handleCityChange}>
                <SelectTrigger id="city" className="capitalize">
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {city?.map((city) => (
                    <SelectItem key={city.id} value={city.city_id}>
                      {city.city_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-row justify-between">
              <h1 className="text-muted-foreground">Product Price</h1>
              <div className="font-semibold text-[#0C0D36]">
                <NumericFormat
                  value={item?.product?.price}
                  displayType={"text"}
                  prefix={"Rp. "}
                  thousandSeparator={true}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <h1 className="text-muted-foreground">Cost Shipping</h1>
              <div className="font-semibold text-[#0C0D36]">
                <NumericFormat
                  value={shippingCost}
                  displayType={"text"}
                  prefix={"Rp. "}
                  thousandSeparator={true}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <h1 className="text-muted-foreground">Gross Amount</h1>
              <div className="font-semibold text-[#0C0D36]">
                <NumericFormat
                  value={grossAmount}
                  displayType={"text"}
                  prefix={"Rp. "}
                  thousandSeparator={true}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setDialogOpen(false);
                checkoutCart(
                  item.id,
                  Number(item?.product?.price),
                  Number(selectedCity)
                );
              }}
              disabled={isLoading || item?.product?.stock <= 0}
            >
              {isLoading ? "Processing..." : "Checkout Now"}
            </Button>
          </DialogFooter>
          {isLoading && (
            <div className="flex justify-center items-center mt-4">
              {/* <Spinner /> Komponen spinner atau teks "Processing..." */}
              <p className="ml-2">Processing payment, please wait...</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
