import Image from "next/image";
import cn from "classnames";
import usePrice from "@utils/use-price";
import { siteSettings } from "@settings/site.settings";
import { AddToCart } from "@components/product/add-to-cart/add-to-cart";
import { useTranslation } from "next-i18next";
import { useModalAction } from "@components/ui/modal/modal.context";
import VariationPrice from "../product-details/product-variant-price";
import { useRouter } from "next/router";
import { useUser } from "@contexts/user.context";
import { useCustomerQuery } from "@data/customer/use-customer.query";

type HeliumProps = {
  product: any;
  className?: string;
};

const Helium: React.FC<HeliumProps> = ({ product, className }) => {
  const { t } = useTranslation("common");
  const { data, isLoading: loadingMe } = useCustomerQuery();
  const subscription = data?.me?.subscription;
 
  const { name, image, unit, quantity } = product ?? {};
  const { openModal } = useModalAction();
  const { price, basePrice, discount } = usePrice({
    amount: product.price,
    baseAmount: product.sale_price,
  });

  const { price: min_price } = usePrice({
    amount: +product.min_price,
  });
  const { price: max_price } = usePrice({
    amount: product.max_price,
  });
  const router = useRouter();
  function handleProductQuickView() {
    // return openModal("PRODUCT_DETAILS", product.slug);
    router.push(`/products/${product.slug}`);
  }
  return (
    <article
      className={cn(
        "product-card cart-type-helium rounded h-full bg-light overflow-hidden transition-shadow duration-200 hover:shadow-sm",
        className
      )}
    >
      <div
        onClick={handleProductQuickView}
        className="relative flex items-center justify-center w-auto h-48 sm:h-64"
        role="button"
      >
        <span className="sr-only">{t("text-product-image")}</span>
        <Image
          src={image?.original ?? siteSettings?.product?.placeholderImage}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="product-image"
        />
        {discount && subscription && subscription.status && (
          <div className="absolute top-3 end-3 md:top-4 md:end-4 rounded-full text-xs leading-6 font-semibold px-1.5 sm:px-2 md:px-2.5 bg-yellow-500 text-light">
            {discount}
          </div>
        )}
      </div>
      {/* End of product image */}

      <header className="p-3 md:p-6 relative">
        <h3
          onClick={handleProductQuickView}
          role="button"
          className="text-heading text-sm font-semibold truncate mb-2"
        >
          {name}
        </h3>
        {/** <p className="text-muted text-xs">{unit}</p> */}
        {/* End of product info */}
        {loadingMe ? (
          <div className="animate-pulse  mt-7 ">
            <div className="flex flex-row">
              <div className=" w-8 mr-8  h-1 border rounded-full bg-gray-200 "></div>
              <div className=" h-1 w-full  border rounded-full bg-gray-200"></div>
            </div>
            <div className="flex flex-row">
              <div className=" mt-1 w-8 mr-8  h-1 border rounded-full bg-gray-200 "></div>
              <div className=" mt-1  h-1 w-full  border rounded-full bg-gray-200"></div>
            </div>
          </div>
        ) : (
          <div className="flex items-center flex-wrap md:flex-nowrap justify-between min-h-6 mt-7 md:mt-8 relative">
            {quantity > 0 && (
              <div className="">
                {discount && subscription && subscription.status && (
                  <del className="text-xs text-muted text-opacity-75 absolute -top-4 md:-top-5 italic">
                    {price}
                  </del>
                )}
                {product.product_type === "simple" ? (
                  <span className="text-accent text-sm md:text-base font-semibold mr-1 ">
                    {(basePrice && subscription && subscription.status)? basePrice : price}
                  </span>
                ) : (
                  <span className="text-accent text-sm md:text-base font-semibold mr-1">
                    {`${min_price}`}
                  </span>
                )}
              </div>
            )}
            {/* End of product price */}

            {quantity > 0 ? (
              <AddToCart data={product} variant="single" isCard={true} />
            ) : (
              <div className="bg-red-500 rounded text-xs text-light px-2 py-1">
                {t("text-out-stock")}
              </div>
            )}
            {/* End of add to cart */}
          </div>
        )}
      </header>
    </article>
  );
};

export default Helium;
