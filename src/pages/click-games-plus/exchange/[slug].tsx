import Layout from "@components/layout/layout";
import { parseContextCookie } from "@utils/parse-cookie";
import { GetServerSideProps, GetStaticPathsContext, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import Step1 from "@components/announces/create-form/step1";
import Step2 from "@components/announces/create-form/step2";
import Step3 from "@components/announces/create-form/step3";
import Step4 from "@components/announces/create-form/step4";
import Step5 from "@components/announces/create-form/step5";
import Step6 from "@components/announces/create-form/step6";
import { NEW_ANNONCE } from "@utils/constants";
import { AnimatePresence } from "framer-motion";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { dehydrate, QueryClient } from "react-query";
import { fetchSettings } from "@data/settings/use-settings.query";
import { fetchProduct } from "@data/product/use-product.query";
import { Product } from "@ts-types/custom.types";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import { fetchProducts } from "@data/product/use-products.query";
import CategoryChoice from "@components/category/category-choice";
import ChoiceGameForm from "@components/click-games-plus/choice-games-form";
import Button from "@components/ui/button";
import { formatToPrice } from "@utils/use-price";
// This function gets called at build time
export async function getStaticPaths({ locales }: GetStaticPathsContext) {
    const products = await fetchProducts({
        queryKey: ["products", { limit: 100 }],
    });
    const paths = products?.data?.flatMap((product: Product) =>
        locales?.map((locale) => ({ params: { slug: product.slug }, locale }))
    );
    return {
        paths,
        fallback: "blocking",
    };
}
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
    const slug = params?.slug as string;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery("settings", fetchSettings);
    try {
        const product = await fetchProduct(slug);
        return {
            props: {
                product,
                ...(await serverSideTranslations(locale!, ["common"])),
                dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            },
            revalidate: 60,
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};
type Iprops = {
    product: Product;
}

const ProductCard = ({ product }: { product: Product }) => {
    return (<div className="w-48 h-74">

        <Image
            src={product?.image?.thumbnail ?? siteSettings?.product?.placeholderImage}
            alt={product?.name}
            layout="responsive"
            height={48}
            width={48}
            priority={true}
            objectFit="contain"
        />
        <h3 className="font-bold">{product?.name}</h3>
        <p>{product?.categories[0]?.name}</p>
    </div>)
}

export default function CreateExchangeProduct({ product }: Iprops) {
    const [myProduct, setMyProduct] = useState<Product>();
    let price = (myProduct && product) ? myProduct.price - product.price : 0;
    price = price < 0 ? 10 : price;
    return (
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-screen" >
            <div className="flex justify-center mt-5 border bg-white">
                <h3 className="text-2xl">Echange de jeux</h3>
            </div>
            <div className="flex justify-center mt-5 border p-5">
                <ProductCard product={product} />
                <div className="my-auto justify mx-4 h-48"
                    style={{ backgroundImage: `url(/vs.png)`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
                >

                    <h4 className="text-xl font-bold mt-20 text-dark">Contre</h4>
                </div>
                {myProduct ? <ProductCard product={myProduct} /> : <div className="w-48 h-48 border bg-white">
                    <div className="flex align-center justify-center">
                        <h3 className="mt-20">Choisir votre jeux</h3>
                    </div>
                </div>}

            </div>
            {!myProduct ? <div className="mt-10 flex justify-center">
                <div className=" w-2xl mx-auto p-4 sm:px-6 lg:px-8 bg-white">
                    <ChoiceGameForm setProduct={setMyProduct} />
                </div>
            </div> : <>
                <div className="mt-10 flex flex-col items-center justify-center">

                    <Button className="w-96" onClick={() => setMyProduct(null)} size="small">Choisir une autre jeux</Button>
                    <div className="mt-5 bg-white flex justify-center">
                        Estimation du prix d'échage: {formatToPrice(price)}
                    </div>


                </div>
            </>}

        </div>

    );
}
CreateExchangeProduct.Layout = Layout;
