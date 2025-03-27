import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SourceData, useOrderData } from "../Providers"

export function SelectSourceData() {
  const {setSourceData} = useOrderData()
    return (
    <Select onValueChange={(e) => setSourceData(e as SourceData)} defaultValue="wa">
      <SelectTrigger className="w-[180px] mb-4">
        <SelectValue placeholder="Asal Data" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pesanan Via</SelectLabel>
          <SelectItem value="wa">Whats App</SelectItem>
          <SelectItem value="web">Web</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
