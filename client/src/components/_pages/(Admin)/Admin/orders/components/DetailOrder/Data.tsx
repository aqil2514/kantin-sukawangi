import DataElementCustomer from "./DataCustomer";
import DataElementOrders from "./DataOrders";

const DataElement: React.FC<{ data?: Transaction.TransactionDb }> = ({
    data,
  }) => {
    if (!data) return null;
  
    return (
      <div className="space-y-2 md:grid md:grid-cols-2 gap-2">
        <DataElementCustomer data={data} />
        <DataElementOrders data={data} />
      </div>
    );
  };

  export default DataElement