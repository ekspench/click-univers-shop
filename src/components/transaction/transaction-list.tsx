import { formatDateComplet } from "@utils/format-date";
import { useIsRTL } from "@utils/locals";
import { formatToPrice } from "@utils/use-price";
import Table from "rc-table";

const TransactionList = ({ transactions }: any) => {
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
      render: (amount: number) => formatToPrice(amount),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      width: 250,
      key: "created_at",
      align: alignRight,
      render: (date:any) => <span>{formatDateComplet(date)}</span>,
    },
  ];
  return (
    <div>
      <Table
        //@ts-ignore
        columns={table_column}
        data={transactions?.pages?.[0]?.data}
        className="orderDetailsTable w-full"
        scroll={{ x: 200, y: 500 }}
      />
    </div>
  );
};

export default TransactionList;
