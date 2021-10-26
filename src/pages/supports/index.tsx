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
import { Button } from "@components/";
import { useTicketQuery } from "@data/ticket/use-ticket.query";
import TicketShow from "@components/ticket/ticket-show";
import { useState } from "react";
import { useWindowSize } from "@utils/use-window-size";

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
  
  
const isMobile=useWindowSize().width<860;
console.log(isMobile);
  return (
    <div className="w-full bg-light">
      <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14  min-h-screen">
        <ProfileSidebar className="flex-shrink-0 hidden xl:block xl:w-80 me-8" />
        {/* End of sidebar navigation */}

        <div className="w-full overflow-hidden flex">
          {(!isMobile||(isMobile&&ticketActive==="NONE"))&&
            <div
            className={`pe-2 lg:pe-2 w-full flex `}
            style={{ height: "calc(100vh - 60px)" }}
          >
            <div className={`flex w-full flex-col h-full pb-5 md:border md:border-border-200 `}>
              <h3 className="text-xl font-semibold py-5 text-heading px-5">
                {t("profile-sidebar-ticket")}
              </h3>
              <Scrollbar
                className="w-full "
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
         {(!isMobile||(isMobile&&ticketActive!=="NONE"))&&
         
         <div className={`flex flex-3 flex-col w-full   border border-border-200`}>
         {ticketActive === "NONE" ? (
           <div className="flex justify-center border p-8 items-center h-full">Veuillez sélectionnez un litige</div>
         ) : (
           <TicketShow id={ticketActive} isMobile={isMobile} go_back={()=>setTicketActive("NONE")} />
         )}
       </div>
         }
         
        </div>
      </div>
    </div>
  );
}
SupportPage.Layout = Layout;
