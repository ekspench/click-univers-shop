import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetStaticPathsContext, GetStaticProps } from "next";
import { scroller, Element } from "react-scroll";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import dynamic from "next/dynamic";
import Banner from "@components/common/banner";
import HomeLayout from "@components/layout/home-layout";
import PromotionSlider from "@components/common/promotion-slider";
import ProductFeed from "@components/product/feed";
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import FilterBar from "@components/common/filter-bar";
import { useWindowSize } from "@utils/use-window-size";
import { sitePages, PageName } from "@settings/site-pages.settings";
import { getKeyValue } from "@utils/get-key-value";
import { fetchProducts } from "@data/product/use-products.query";
import { fetchCategories } from "@data/category/use-categories.query";
import { fetchTypes } from "@data/type/use-types.query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { fetchSettings } from "@data/settings/use-settings.query";
import FooterOne from "@components/layout/footer-one";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { NextSeo } from "next-seo";
import { SEO } from "@components/seo";

const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

// This function gets called at build time
/*export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  /*const { types } = await fetchTypes();*/

/* const paths = types
    ?.filter((t: any) => t.slug !== "bakery")
    .flatMap((type: any) =>
      locales?.map((locale) => ({ params: { type: type.slug }, locale }))
    );
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };*/
//}

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
      ...(await serverSideTranslations(locale!, ["common", "banner"])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 120,
  };
};

export default function HomePage() {
  const { query } = useRouter();
  useEffect(() => {
    if (query.text || query.category) {
      scroller.scrollTo("grid", {
        smooth: true,
        offset: -110,
      });
    }
  }, [query.text, query.category]);

  const { width } = useWindowSize();
  const PAGE_TYPE = query.type?.toString();
  const getPageData = getKeyValue(sitePages, PAGE_TYPE as PageName);

  return (
    <>
      <SEO
      title="Click sur ton Univers"
      />
      <Banner banner={getPageData?.banner} className="miiiin-h-screen" />
    {/** <PromotionSlider /> */} 
      <FilterBar />
      <Element
        name="grid"
        className="flex flex-1 border-t border-solid border-border-200 border-opacity-70"
      >
        <CategoryDropdownSidebar />
        <main className="flex-1">
           
          <ProductFeed />
          <FooterOne />
        </main>
      </Element>
      {width > 1023 && <CartCounterButton />}
      <CookieConsent  buttonText="ok!" style={{ background: "white",color:"black",boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",textAlign: "center" }}>Nous utilisons des cookies pour vous garantir la meilleure exp??rience sur notre site web. Si vous continuez ?? utiliser ce site, nous supposerons que vous en ??tes satisfait.</CookieConsent>
    </>
  );
}

HomePage.Layout = HomeLayout;
