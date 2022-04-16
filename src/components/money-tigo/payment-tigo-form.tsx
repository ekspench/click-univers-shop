import Loader from "@components/ui/loader/loader";
import http from "@utils/api/http";
import { useEffect, useState } from "react";
import { Button } from "..";


const PaymentTigoForm = ({ data, amount }) => {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<undefined | string>(undefined);
    useEffect(() => {
        http.post("/tigo/test", data).then(
            (response) => {
                setToken(response.data.SACS);
                setLoading(false);
            }
        );
    }, [])
    return (<form>
        {(loading && token === undefined) ? <Loader className="h-8 w-8" /> : <moneytigo-app embedded="true" actuatorid="submit-credit-card-button" token={`${token}`}>

        </moneytigo-app>}
        <button id="submit-credit-card-button">Pay</button>
    </form>)
}

export default PaymentTigoForm;