import { useGameSale } from "@contexts/game-sale.context";
import { useCreatePurchaseGameMutation } from "@data/purchase-game/use-create-purchase-game.mutation";
import { formatToPrice } from "@utils/use-price";
import { Button } from "..";

/* This example requires Tailwind CSS v2.0+ */
const products = [
  {
    id: 1,
    name: "Cold Brew Bottle",
    description:
      "This glass bottle comes with a mesh insert for steeping tea or cold-brewing coffee. Pour from any angle and remove the top for easy cleaning.",
    href: "#",
    quantity: 1,
    price: "$32.00",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-05-product-01.jpg",
    imageAlt: "Glass bottle with black plastic pour top and mesh insert.",
  },
];

export default function GameToSaleStep3({ onSuccess }: any) {
  const { shipping, purchase_games, total_amount } = useGameSale();
  const { mutate,isLoading } = useCreatePurchaseGameMutation();
  const onValidate = () => {
    /*mutate({
     purchase_games:purchase_games,
     
  });*/
    const input = {
      purchase_games: purchase_games,
      ...shipping,
      shipping_company: shipping?.shipping_company.value,
      sender_address_id: shipping?.sender_address?.id,
    };
    mutate(input, {
      onSuccess: (e) => {
        onSuccess(e.ref);
      },
    });
  };
  return (
    <div className="bg-white">
      <div className="max-w-xl">
        <h1 className="text-md font-semibold uppercase tracking-wide text-indigo-600">
          Validation de votre paquet
        </h1>
        <div className="grid grid-cols-2">
          <dl className="mt-2 text-sm font-medium">
            <dt className="text-gray-900">Company de livraison:</dt>
            <dd className="text-indigo-600 ml-4">
              {shipping?.shipping_company?.value}
            </dd>
          </dl>

          <dl className="mt-2 text-sm font-medium">
            <dt className="text-gray-900">Numero de suivie:</dt>
            <dd className="text-indigo-600 ml-4">
              {shipping?.tracking_number}
            </dd>
          </dl>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-200">
        <h2 className="sr-only">Vos jeux</h2>

        <h3 className="sr-only">Items</h3>
        {purchase_games.map((purchase_game: any) => (
          <div
            key={purchase_game.game.id}
            className="py-5 border-b border-gray-200 flex space-x-6"
          >
            {/** 
              *  <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40"
              />
             */}
            <div className="flex-auto flex flex-col">
              <div>
                <h4 className="font-medium text-gray-900">
                  {purchase_game?.game?.name}
                </h4>
                <p className=" text-sm text-gray-600"></p>
              </div>
              <div className="mt-2 flex-1 flex items-end">
                <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                  <div className="flex">
                    <dt className="font-medium text-gray-900">Quantité</dt>
                    <dd className="ml-2 text-gray-700">
                      {purchase_game?.quantity}
                    </dd>
                  </div>
                  <div className="pl-4 flex sm:pl-6">
                    <dt className="font-medium text-gray-900">Prix de vente</dt>
                    <dd className="ml-2 text-gray-700">
                      {formatToPrice(purchase_game?.price)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ))}

        <div className="sm:ml-40 sm:pl-6">
          <h3 className="sr-only">Adresse de livraison</h3>
          <dl className="grid grid-cols-2 gap-x-6 text-sm py-10">
            <div>
              <dt className="font-medium text-gray-900">Destinateur</dt>
              <dd className="mt-2 text-gray-700">
                <address className="not-italic">
                  <span className="block">Click Univers</span>
                  <span className="block">24300 Audincourt</span>
                  <span className="block">France</span>
                </address>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Expediteur</dt>
              <dd className="mt-2 text-gray-700">
                <address className="not-italic">
                  <span className="block">
                    {shipping?.sender_address?.title}
                  </span>
                  <span className="block">
                    {shipping?.sender_address?.address?.zip}{" "}
                    {shipping?.sender_address?.address?.city}
                  </span>
                  <span className="block">
                    {shipping?.sender_address?.address?.country}
                  </span>
                </address>
              </dd>
            </div>
          </dl>

          <h3 className="sr-only">Resumé</h3>

          <dl className="space-y-6 border-t border-gray-200 text-sm pt-10">
            <div className="flex justify-between">
              <dt className="font-medium text-gray-900">Vente total</dt>
              <dd className="text-gray-900">{formatToPrice(total_amount)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <Button loading={isLoading} onClick={onValidate} className="mt-5 w-full">
        Valider
      </Button>
    </div>
  );
}
