import Layout from "@components/layout/layout";
import { termsAndServices } from "@settings/terms.settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { cgua } from '@settings/site-terms-buyers';
import { cga } from "@settings/site-terms-acheteurs";
import { cgu } from '@settings/site-terms-and-services';
import { cguv } from '@settings/site-terms-vendors';
import { useState } from "react";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

export default function TermsPage() {
  const { t } = useTranslation("terms");
  const[terms,setTerms]=useState<any>(cgua);
  

  return (
    <section className="max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
     <div className="flex">
     <button className="mx-2 p-2 pl-5 pr-5 bg-transparent border-2 border-gray-500 text-gray-500 text-lg rounded-lg hover:bg-gray-500 hover:text-gray-100 focus:border-4 focus:border-gray-300"
      onClick={()=>setTerms(cgu)}
     >CGU</button>
      <button className="mx-2 p-2 pl-5 pr-5 bg-transparent border-2 border-gray-500 text-gray-500 text-lg rounded-lg hover:bg-gray-500 hover:text-gray-100 focus:border-4 focus:border-gray-300"
      onClick={()=>setTerms(cguv)}
     >CGUV</button>
      <button className="mx-2 p-2 pl-5 pr-5 bg-transparent border-2 border-gray-500 text-gray-500 text-lg rounded-lg hover:bg-gray-500 hover:text-gray-100 focus:border-4 focus:border-gray-300"
      onClick={()=>setTerms(cgua)}
     >CGUA</button>
      <button className="mx-2 p-2 pl-5 pr-5 bg-transparent border-2 border-gray-500 text-gray-500 text-lg rounded-lg hover:bg-gray-500 hover:text-gray-100 focus:border-4 focus:border-gray-300"
      onClick={()=>setTerms(cga)}
     >CGA</button>
     </div>
     
      <header className="sm:mt-2 xl:mt-4 mb-10 lg:mb-14">
        <h1 className="text-xl md:text-2xl sm:text-3xl 2xl:text-4xl text-heading font-bold mb-4 sm:mb-5 2xl:mb-7">
          {terms.title}
        </h1>
        <p className="text-sm md:text-base text-body-dark 2xl:text-lg px-0.5">
          {terms.date}
        </p>
      </header>
      {/* End of page header */}

      <div className="flex flex-col md:flex-row">
        <nav className="md:w-72 xl:w-3/12 mb-8 md:mb-0">
          <ol className="sticky md:top-16 lg:top-22 bg-gray-100 z-10">
            {terms.content?.map((item:any) => (
              <li key={item.title}>
                <Link
                  spy={true}
                  offset={-120}
                  smooth={true}
                  duration={500}
                  to={makeTitleToDOMId(item.title)}
                  activeClass="text-sm lg:text-base text-heading font-semibold"
                  className="cursor-pointer inline-flex py-3 text-sub-heading uppercase"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        {/* End of section scroll spy menu */}

        <div className="md:w-9/12 md:ps-8 md:pb-96">
          {terms.content?.map((item:any) => (
            <Element
              key={item.title}
              name={makeTitleToDOMId(item.title)}
              className="mb-10"
            >
              <h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">
                {item.title}
              </h2>
              <div
                className="text-body-dark leading-loose"
                dangerouslySetInnerHTML={{ __html: t(item.description) }}
              />
            </Element>
          ))}
        </div>
        {/* End of content */}
      </div>
    </section>
  );
}

TermsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "terms"])),
    },
  };
};
