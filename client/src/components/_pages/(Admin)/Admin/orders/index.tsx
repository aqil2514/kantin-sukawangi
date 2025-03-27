"use client";
import { SelectSourceData } from "./components/SelectSource";
import { TableWebData } from "./components/Table/TableWeb";
import TableWaData from "./components/Table/TableWa";
import { useOrderData } from "./Providers";

export default function Order() {
  const { transactionData, sourceData } = useOrderData();
  const isWeb = sourceData === "web";
  const isWA = sourceData === "wa";
  const {webData, waData} = transactionData;

  return (
    <div className="p-4">
      <SelectSourceData />
        {isWeb && <TableWebData transactionData={webData} />}
        {isWA && <TableWaData transactionData={waData} /> }
    </div>
  );
}
