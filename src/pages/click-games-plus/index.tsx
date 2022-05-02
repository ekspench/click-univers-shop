import Layout from "@components/layout/layout";
import { privacyPolicy } from "@settings/privacy.settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import HomeLayout from "@components/layout/home-layout";
import Button  from "@components/ui/button";
import { GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { fetchSettings } from "@data/settings/use-settings.query";
import { fetchProducts } from "@data/product/use-products.query";
import { fetchCategories } from "@data/category/use-categories.query";
import { fetchTypes } from "@data/type/use-types.query";
import ListGamesExchange from "@components/click-games-plus/list-games-exchange";
import ListLogo from "@components/click-games-plus/list-logo";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}
const products = [
  {
    id: 1,
    name: "Super Mario Odyssey standard",
    color: "White and black",
    href: "#",
    imageSrc:
      "https://www.click-univers.com/_next/image?url=https%3A%2F%2Fapi.click-univers.com%2Fstorage%2F457%2Fconversions%2F81TksYoxfQL._AC_SL1500_-thumbnail.jpg&w=1920&q=75",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  {
    id: 2,
    name: "Super Mario Odyssey standard",
    color: "White and black",
    href: "#",
    imageSrc:
      "https://www.click-univers.com/_next/image?url=https%3A%2F%2Fapi.click-univers.com%2Fstorage%2F457%2Fconversions%2F81TksYoxfQL._AC_SL1500_-thumbnail.jpg&w=1920&q=75",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  // More products...
];
export default function ClickGamePlusPage() {
  const { t } = useTranslation("policy");
  const { title, date, content } = privacyPolicy;

  return (
    <div className="flex  justify-beetwen flex-col h-screen">
      <div className=" bg-white mt md:mt-20 flex justify-center">
        <div aria-hidden="true" className="inset-0 overflow-hidden lg:w-1/4 w-1/2 mt-10">
          <img
            src="click-games-plus.png"
            alt=""
            className="w-full h-full object-center object-cover"
          />
        </div>
      </div>
      <ListLogo/>
      <Element
        name="grid"
        className="flex flex-1 border-t border-solid border-border-200 border-opacity-70"
      >
        <ListGamesExchange/>
      </Element>
    </div>
  );
}

ClickGamePlusPage.Layout = HomeLayout;

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("settings", fetchSettings);

  await queryClient.prefetchInfiniteQuery(
    ["products", { type: params?.type }],
    fetchProducts,
    {
      staleTime: 60 * 1000,
    }
  );
  await queryClient.prefetchQuery(
    ["fetch-parent-category", { type: params?.type }],
    fetchCategories,
    {
      staleTime: 60 * 1000,
    }
  );
  await queryClient.prefetchQuery("types", fetchTypes, {
    staleTime: 60 * 1000,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 120,
  };
};