import { useModalAction } from "@components/ui/modal/modal.context";
import SelectInput from "@components/ui/select-input";
import SelectAutoComplete from "@components/ui/SelectAutoComplete";
import { SaleGameProvider, useGameSale } from "@contexts/game-sale.context";
import { useGamesQuery } from "@data/game/use-games.query";
import { usePlatformsQuery } from "@data/platform/use-platforms.query";
import { Platform } from "@ts-types/platforms-type";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "..";

type FormValue = {
  game: any;
  platform: any;
};

const GameSaleAddForm = () => {
  const { control, watch, handleSubmit } = useForm<FormValue>();
  const platform = watch("platform");
  const game = watch("game");
  const [text, setText] = useState<string | undefined>();
  const { data, isLoading } = usePlatformsQuery();
  const { data: gameData, isLoading: loadingGame } = useGamesQuery({
    text: text,
    platform_id: platform?.id,
  });
  const { closeModal } = useModalAction();
  const { addGameSale } = useGameSale();
  const onSubmit = (values: FormValue) => {
    console.log(addGameSale);
    addGameSale({
      game: values?.game,
      price: values?.game?.buy_price,
      total_price: values?.game?.buy_price,
      quantity: 1,
    });
    closeModal();
  };
  return (
    <div className="bg-white max-w-2xl  w-96 mx-auto p-8 md:rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-md font-semibold mb-5">
          Ajouter votre jeux à vendre
        </h3>
        <div className="mb-5">
          <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
            Platform
          </label>
          <SelectInput
            isLoading={isLoading}
            label={"Platform"}
            control={control}
            getOptionLabel={(option: Platform) => option?.name}
            getOptionValue={(option: Platform) => option?.id}
            name={"platform"}
            options={data?.platforms?.data ?? []}
          />
        </div>
        {platform && (
          <div className="">
            <label className="block text-body-dark font-semibold text-sm leading-none mb-3">
              Entrer le nom de votre jeux
            </label>

            <SelectInput
              isLoading={loadingGame}
              label={"game"}
              control={control}
              getOptionLabel={(option: Platform) => option?.name}
              getOptionValue={(option: Platform) => option?.id}
              name={"game"}
              onInputChange={(e) => setText(e)}
              options={gameData?.games?.data?.data ?? []}
            />
          </div>
        )}
        {game && (
          <Button className="mt-5" type="submit">
            Ajouter
          </Button>
        )}
      </form>
    </div>
  );
};

export default GameSaleAddForm;
