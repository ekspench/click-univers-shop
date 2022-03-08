import PriceView from "@components/common/price-view";
import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUpdatePurchaseGameMutation } from "@data/purchase-game/use-update-purchase-game.mutation";

const ChatData = ({ data }: any) => {
    const {openModal}=useModalAction();
  switch (data.type) {
    case "PPP":
     
      return (
        <div className="flex flex-col mt-2 items-center justify-center w-full px-4 border p-4">
          <p className="mb-5">Montant de l'offre est de <PriceView amount={data?.total}/></p>
        
          <Button
          onClick={()=>openModal("PURCHASE_PURPOSE_VIEW",{message:data})}
          size="small"
          className="bg-green-500 hover:bg-green-600">Detail</Button>
        </div>
      );
      break;

    default:
      return <div>tt</div>;
      break;
  }
};
export default ChatData;
