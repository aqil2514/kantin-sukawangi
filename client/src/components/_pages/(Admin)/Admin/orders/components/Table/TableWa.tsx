import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableStatus from "./Forshare/TableStatus";
import TableDetailOrder from "./Forshare/TableDetailOrder";
import TableData from "./Forshare/TableData";

interface Props {
  transactionData: Transaction.TransactionDbWa[];
}
// TODO : Buat Table untuk nampilin data yang mesen dari WA
export default function TableWaData({ transactionData }: Props) {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Atas Nama</TableHead>
            <TableHead>Status Pesanan</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionData.map((data) => {
            const orderId = data.order_id;
            const customerName = data.order_details?.customer_details.full_name || "Tidak diisi";
            return(
            <TableRow key={orderId}>
              <TableData value={orderId} orderId={orderId} />
              <TableData value={customerName} orderId={orderId} />
              <TableStatus status={data.status} />
              <TableDetailOrder orderId={orderId} />
            </TableRow>
          )})}
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
