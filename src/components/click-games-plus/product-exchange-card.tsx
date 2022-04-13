import { siteSettings } from "@settings/site.settings";
import { Product } from "@ts-types/custom.types";
import { useRouter } from "next/router";

import { Button } from "..";

type Iprops = {
    product: Product;
}

const ProductExchangeCard = ({ product }: Iprops) => {
    const { push } = useRouter();
    return <div>
        <div className="relative border group">
            <div className="relative w-full h-72 rounded-lg overflow-hidden">
                <img
                    src={product.image?.thumbnail ?? siteSettings?.product?.placeholderImage}
                    alt={product.name}
                    className="w-full h-full object-center object-cover"
                />
            </div>
            <div className="absolute top-0  h-full inset-x-0 flex items-center justify-center cursor">
                <Button onClick={() => push(`/click-games-plus/exchange/${product?.slug}` )} type="button" size="small" className="cursor-pointer transition  z-50  ease-in-out group-hover:duration-150 delay-300 hidden group-hover:block">Echanger</Button>
            </div>
            <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                />
                <p className="relative text-lg font-semibold text-light">
                    {product.name}
                </p>
            </div>
        </div>

    </div>
}

export default ProductExchangeCard;