import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";

export default function TableDetailOrder({ orderId }: { orderId: string }) {
  console.log(orderId + " Under Development");
  return (
    <TableCell>
      <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Detail
      </Button>
    </TableCell>
  );
}
