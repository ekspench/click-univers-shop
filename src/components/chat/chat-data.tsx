import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUpdatePurchaseGameMutation } from "@data/purchase-game/use-update-purchase-game.mutation";

const ChatData = ({ data }: any) => {
    const {openModal}=useModalAction();
  switch (data.type) {
    case "PPP":
     
      return (
        <div className="flex mt-2 justify-center w-full px-4">
          <Button
          onClick={()=>openModal("PURCHASE_PURPOSE_VIEW",{message:data})}
          className="bg-green-500 hover:bg-green-600">Voir l'offre</Button>
        </div>
      );
      break;

    default:
      return <div>tt</div>;
      break;
  }
};
export default ChatData;
