"use client";
import React from "react";
import { useProductFilter } from "./logic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaFilter } from "react-icons/fa";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MobileSidebar() {
  const { isActive, resetHandler, sortHandler, inputNameHandler, searchTerm } =
    useProductFilter();

  return (
    <div className="flex px-4 gap-4 mb-4">
      <Dialog>
        <DialogTrigger className="block md:hidden">
          <FaFilter />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Config</DialogTitle>
          </DialogHeader>
          <div className="w-full p-4 border-2 border-double rounded-xl border-slate-500">
            <div>
              <h3 className="font-sans">Urut Berdasarkan :</h3>

              <div>
                <h4 className="font-sans">Harga :</h4>
                <RadioGroup className="flex justify-center gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      data-sort-by="harga"
                      value="asc"
                      id="termurah"
                      checked={isActive("harga", "asc")}
                      onClick={sortHandler}
                    />
                    <Label
                      htmlFor="termurah"
                      className={`${
                        isActive("harga", "asc")
                          ? "text-blue-500 font-bold"
                          : ""
                      }`}
                    >
                      Termurah
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      data-sort-by="harga"
                      value="desc"
                      id="termahal"
                      checked={isActive("harga", "desc")}
                      onClick={sortHandler}
                    />
                    <Label
                      htmlFor="termahal"
                      className={`${
                        isActive("harga", "desc")
                          ? "text-blue-500 font-bold"
                          : ""
                      }`}
                    >
                      Termahal
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h4 className="font-sans">Abjad :</h4>
                <RadioGroup className="flex justify-center gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      data-sort-by="abjad"
                      value="asc"
                      id="a-z"
                      checked={isActive("abjad", "asc")}
                      onClick={sortHandler}
                    />
                    <Label
                      htmlFor="a-z"
                      className={`${
                        isActive("abjad", "asc")
                          ? "text-blue-500 font-bold"
                          : ""
                      }`}
                    >
                      A-Z
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      data-sort-by="abjad"
                      value="desc"
                      id="z-a"
                      checked={isActive("abjad", "desc")}
                      onClick={sortHandler}
                    />
                    <Label
                      htmlFor="z-a"
                      className={`${
                        isActive("abjad", "desc")
                          ? "text-blue-500 font-bold"
                          : ""
                      }`}
                    >
                      Z-A
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="mt-4">
              <Button
                onClick={resetHandler}
                variant="secondary"
                className="w-full"
              >
                Default
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Input
        placeholder="Cari Produk..."
        value={searchTerm}
        onChange={inputNameHandler}
      />
    </div>
  );
}
