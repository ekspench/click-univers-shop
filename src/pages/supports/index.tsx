import { parseContextCookie } from "@utils/parse-cookie";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Spinner from "@components/ui/loaders/spinner/spinner";
import Scrollbar from "@components/ui/scrollbar";
import ProfileSidebar from "@components/profile/profile-sidebar";
import NotFound from "@components/common/not-found";
import Collapse from "rc-collapse";
import { useTranslation } from "react-i18next";
import Layout from "@components/layout/layout";
import TicketCard from "@components/ticket/ticket-card";
import { fetchTicket, useTicketsQuery } from "@data/ticket/use-tickets.query";
import Button from "@components/ui/button";
import { useTicketQuery } from "@data/ticket/use-ticket.query";
import TicketShow from "@components/ticket/ticket-show";
import { useState } from "react";
import { useWindowSize } from "@utils/use-window-size";
import { SEO } from "@components/seo";
import AccountLayout from "@components/layout/account-layout";
import { PlusIcon } from "@components/icons/plus-icon";
import { useModalAction } from "@components/ui/modal/modal.context";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
};

export default function SupportPage() {
  const { t } = useTranslation("common");
  const [ticketActive, setTicketActive] = useState("NONE");
  const {
    data,
    isFetching: loading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage: loadingMore,
  } = useTicketsQuery();

  const {openModal}=useModalAction();
  const isMobile = useWindowSize().width < 860;
  return (
    <>
      <SEO title="Supports" />
      <div className="w-full ">
        <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14  min-h-screen">
          {/* End of sidebar navigation */}

          <div className="w-full  overflow-hidden flex">
            {(!isMobile || (isMobile && ticketActive === "NONE")) &&
              <div
                className={`pe-2 lg:pe-2 w-full flex max-w-xl`}
                style={{ height: "calc(100vh - 60px)" }}
              >
                <div className={`flex flex-col  h-full pb-5 md:border md:border-border-200 `}>
                  <div className="flex justify-between"> <h3 className="text-xl font-semibold py-5 text-heading px-5">
                    {t("profile-sidebar-ticket")}
                  </h3>
                    <button
                      className="flex mr-4 items-center text-sm font-semibold text-accent transition-colors duration-200 focus:outline-none focus:text-accent-hover hover:text-accent-hover"
                      onClick={() => openModal("ADD_TICKET")}
                    >
                      <PlusIcon className="w-4 h-4 stroke-2 me-0.5" />
                      Demande une litige
                    </button>
                    
                  </div>


                  <Scrollbar
                    className="w-full px-4"
                    style={{ height: "calc(100% - 80px)" }}
                  >
                    <ul className="p-2">
                      {data?.pages[0].data.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} ticketActive={ticketActive} setActive={setTicketActive} />
                      ))}
                    </ul>
                  </Scrollbar>
                </div>
              </div>
            }
            {(!isMobile || (isMobile && ticketActive !== "NONE")) &&

              <div className={`flex flex-3 flex-col w-full   border border-border-200`}>
                {ticketActive === "NONE" ? (
                  <div className="flex justify-center border p-8 items-center h-full">Veuillez sélectionnez un litige</div>
                ) : (
                  <TicketShow id={ticketActive} isMobile={isMobile} go_back={() => setTicketActive("NONE")} />
                )}
              </div>
            }

          </div>
        </div>
      </div>
    </>
  );
}
SupportPage.Layout = AccountLayout;
