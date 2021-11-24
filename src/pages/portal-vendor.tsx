import { CheckMark } from "@components/icons/checkmark";
import Layout from "@components/layout/layout";
import Items from "@components/portal-vendor/Items";
import { parseContextCookie } from "@utils/parse-cookie";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ["common"])),
    },
  };
};

const Items1=[
  {
    id:1,
    title:"Vos opérations marketing simplifiées",
    content:"Avec les fonctionnalités de référencement intégrées de Click Univers, vous pouvez facilement améliorer le référencement de votre boutique en ligne. L'automatisation du marketing digital vous offrent un avantage concurrentiel."
  },
  {
    id:2,
    title:"Vendez facilement en ligne",
    content:"Créez votre espace e-commerce en quelques clics et concrétisez vos idées",
  },
  {
    id:2,
    title:"Optimisation de référencement produit",
    content:"Aidez les clients potentiels à trouver vos produits sur les moteurs de recherche. Click Univers référence vos produits le tout en seulement quelques clics.",
  }
  
]
export default function PortalVendor() {
  return (
    <div className="bg-white p-8">
      <main>
        {/* Hero section */}

        {/* Alternating Feature Sections */}
        <div className="relative pt-16 pb-32 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"
          />
          <div className="relative">
            <div className="lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                <div>
                  <div>
                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-accent">
                      <CheckMark
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      Vendre sur Internet facilement
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      Créez votre compte vendeur et vendez en quelques clics sur
                      Click Univers
                    </p>
                    <div className="sm:grid sm:grid-cols-2 sm:gap-px mt-8">
                     {Items1.map(item=>(
                       <Items title={item.title} content={item.content}/>
                     ))}
                    </div>
                    <div className="mt-6">
                      <a
                        href="https://admin.click-univers.com/register"
                        className="inline-flex bg-accent to-accent-600 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-accent-700"
                      >
                        Commencer
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-6"></div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute  "
                    src="/portal-vendor/image-2.jpg"
                    alt="Inbox user interface"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24">
            <div className="lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <section
                aria-labelledby="testimonial-heading"
                className="relative py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:py-32 lg:px-8"
              >
                <div className="max-w-2xl mx-auto lg:max-w-none">
                  <h2
                    id="testimonial-heading"
                    className="text-2xl font-extrabold tracking-tight text-gray-900"
                  >
                    What are people saying?
                  </h2>
                  <div className="mt-16 space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
                    <blockquote className="sm:flex lg:block">
                      <svg
                        width={24}
                        height={18}
                        viewBox="0 0 24 18"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="flex-shrink-0 text-gray-300"
                      >
                        <path
                          d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0">
                        <p className="text-lg text-gray-600">
                          My order arrived super quickly. The product is even
                          better than I hoped it would be. Very happy customer
                          over here!
                        </p>
                        <cite className="mt-4 block font-semibold not-italic text-gray-900">
                          Sarah Peters, New Orleans
                        </cite>
                      </div>
                    </blockquote>
                    <blockquote className="sm:flex lg:block">
                      <svg
                        width={24}
                        height={18}
                        viewBox="0 0 24 18"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="flex-shrink-0 text-gray-300"
                      >
                        <path
                          d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0">
                        <p className="text-lg text-gray-600">
                          I had to return a purchase that didn’t fit. The whole
                          process was so simple that I ended up ordering two new
                          items!
                        </p>
                        <cite className="mt-4 block font-semibold not-italic text-gray-900">
                          Kelly McPherson, Chicago
                        </cite>
                      </div>
                    </blockquote>
                    <blockquote className="sm:flex lg:block">
                      <svg
                        width={24}
                        height={18}
                        viewBox="0 0 24 18"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="flex-shrink-0 text-gray-300"
                      >
                        <path
                          d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0">
                        <p className="text-lg text-gray-600">
                          Now that I’m on holiday for the summer, I’ll probably
                          order a few more shirts. It’s just so convenient, and
                          I know the quality will always be there.
                        </p>
                        <cite className="mt-4 block font-semibold not-italic text-gray-900">
                          Chris Paul, Phoenix
                        </cite>
                      </div>
                    </blockquote>
                  </div>
                </div>
              </section>

              <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="/portal-vendor/image-1.png"
                    alt="Customer profile user interface"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Feature Section */}

        {/* Stats section */}
        <div className="relative bg-gray-900">
          <div className="h-80 absolute inset-x-0 bottom-0 xl:top-0 xl:h-full">
            <div className="h-full w-full xl:grid xl:grid-cols-2">
              <div className="h-full xl:relative xl:col-start-2">
                <img
                  className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                  src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                  alt="People working on laptops"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Prêt à commencer?</span>
              <span className="block bg-accent to-accent-600 bg-clip-text text-transparent">
                Contactez-nous ou créez un compte.
              </span>
            </h2>
            <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
              <a
                href="https://admin.click-univers.com/admin"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm bg-accent"
              >
                Commencer
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

PortalVendor.Layout = Layout;
