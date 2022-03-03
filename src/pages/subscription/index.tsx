import "rc-collapse/assets/index.css";
import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AccountLayout from "@components/layout/account-layout";
import { CheckMark } from "@components/icons/checkmark";
import { PlusIcon } from "@components/icons/plus-icon";
import { formatToPrice } from "@utils/use-price";
import SubscriptionDetail from "@components/subscription/subscription-detail";

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
const checklist = [
  'Commission',
  'Parrainage',
  'Prix reduit',
  'Reparer vos console',
  'Vendre jeux',
  '14 jour d\'essaie',
]
export default function SubscribePage() {
 
  return (
  <>
  <SubscriptionDetail/></>
  );
}

SubscribePage.Layout = AccountLayout;
