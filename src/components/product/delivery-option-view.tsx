import { CheckMark } from "@components/icons/checkmark";

const DeliveryOptionView = ({ product }: any) => {
  return (
    <>
      <div className="max-w-sm">
        <div className="flex justify-between">
          <div>Livraison à domicile</div>
          <div className="text-green-500 flex align-center items-center">
            <CheckMark width={16} height={16} />{" "}
            <span className="ml-2">Disponible</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div>Retrait point de relais</div>
          <div className="text-green-500 flex align-center items-center">
            <CheckMark width={16} height={16} />{" "}
            <span className="ml-2">Disponible</span>
          </div>
        </div>
        {product.click_collect&&
         <div className="flex justify-between">
         <div>Retrait en mode click&collect</div>
         <div className="text-green-500 flex align-center items-center">
           <CheckMark width={16} height={16} />{" "}
           <span className="ml-2">Disponible</span>
         </div>
       </div>
        }
      </div>
    </>
  );
};
export default DeliveryOptionView;
