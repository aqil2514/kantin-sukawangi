"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProductFilter } from "./logic";

export default function Sidebar() {
  const { inputNameHandler, isActive, resetHandler, searchTerm, sortHandler } =
    useProductFilter();

    // TODO : Perbaiki lagi, ini kalo di mobile berantakan
  return (
    <ScrollArea className="hidden md:block p-4 border-2 border-double rounded-xl border-slate-500">
      <Input
        placeholder="Cari Produk..."
        value={searchTerm}
        onChange={inputNameHandler}
      />

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
                  isActive("harga", "asc") ? "text-blue-500 font-bold" : ""
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
                  isActive("harga", "desc") ? "text-blue-500 font-bold" : ""
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
                  isActive("abjad", "asc") ? "text-blue-500 font-bold" : ""
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
                  isActive("abjad", "desc") ? "text-blue-500 font-bold" : ""
                }`}
              >
                Z-A
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="mt-4">
        <Button onClick={resetHandler} variant="secondary" className="w-full">
          Default
        </Button>
      </div>
    </ScrollArea>
  );
}
