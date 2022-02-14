import { useIsRTL } from "@utils/locals";
import Table from "rc-table";

const TransactionList = () => {
  const { alignLeft, alignRight } = useIsRTL();
  const table_column = [
    {
      title: "Transaction",
      dataIndex: "object",
      key: "object",
      align: alignLeft,
      ellipsis: true,
    },
    {
      title: "Montant",
      dataIndex: "amount",
      width: 250,
      key: "amount",
      align: alignLeft,
    },
    {
      title: "type",
      dataIndex: "type",
      width: 100,
      key: "type",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      width: 250,
      key: "created_at",
      align: alignRight,
    },
  ];
  return (
    <div>
      <Table
        //@ts-ignore
        columns={table_column}
        data={[]}
        className="orderDetailsTable w-full"
        scroll={{ x: 200, y: 500 }}
      />
    </div>
  );
};

export default TransactionList;
