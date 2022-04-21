import PriceView from "@components/common/price-view";
import { ArrowPrevIcon } from "@components/icons/arrow-prev";
import { Lock } from "@components/icons/lock";
import Loader from "@components/ui/loader/loader";
import http from "@utils/api/http";
import { formatToPrice } from "@utils/use-price";
import { useEffect, useState } from "react";
import { Button } from "..";


const PaymentTigoForm = ({ data, amount,goBack }) => {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<undefined | string>(undefined);
    useEffect(() => {
        http.post("/tigo/test", data).then(
            (response) => {
                setToken(response.data.SACS);
                setLoading(false);
                window.scrollTo(0,document.body.scrollHeight);
            }
        );
    }, []);

    if (loading) {
        return (
            <div className="pt-8">
                <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700 flex space-x-4">
                    <Loader className="h-8 w-8 mr-4" simple={true} text="chargement" />
                    {"Chargment de module de paiement"}
                </div>
            </div>
        );
    }
    return (
        <div className="pt-8">
            <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
                <button onClick={()=>goBack()}><ArrowPrevIcon height={32} width={32}/></button>
                <div className="w-full pt-1 pb-5">
                    <div className="bg-accent text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                        <Lock width="48" heigth="48" />
                    </div>
                </div>
                <div className="mb-2">
                    <h1 className="text-center font-bold text-xl uppercase">
                        Informations de paiement sécurisées
                    </h1>
                </div>
                <form>
                    <moneytigo-app embedded="true" actuatorid="submit-credit-card-button" token={`${token}`}>

                    </moneytigo-app>
                    <Button className="w-full" id="submit-credit-card-button">Payer  <PriceView className="ml-2" amount={amount}/></Button>
                 
                </form>
            </div>
        </div>)
}

export default PaymentTigoForm;