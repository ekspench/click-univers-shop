import { useModalAction } from "@components/ui/modal/modal.context";
import { Table } from "@components/ui/table";
import { useIsRTL } from "@utils/locals";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export const GamePurchaseList = ({ gamePurchases }: { gamePurchases: any }) => {
    const { t } = useTranslation("common");
    const { alignLeft, alignRight } = useIsRTL();
    const { openModal } = useModalAction();
  
    const refundTableColumns = [
    
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        width: 250,
        align: alignLeft,
        ellipsis: true,
      },
      {
        title: t("ref"),
        dataIndex: "ref",
        key: "ref",
        align: "center",
      },
      {
        title: "Date",
        dataIndex: "created_at",
        key: "created_at",
        align: alignLeft,
        render: (created_at: string) => (
          <span>{dayjs(created_at).format("DD/MM/YYYY")}</span>
        ),
      },
      {
        title: t("text-amount"),
        dataIndex: "amount",
        key: "amount",
        align: "center",
      },
      {
        title: t("text-status"),
        dataIndex: "status",
        key: "status",
        align: alignRight,
        render: (status: string) => <span>{t(`text-${status}`)}</span>,
      },
    ];
  
    return (
      <Table
        //@ts-ignore
        columns={refundTableColumns}
        data={gamePurchases}
        className="orderDetailsTable w-full"
        scroll={{ x: 350, y: 500 }}
      />
    );
  };
  