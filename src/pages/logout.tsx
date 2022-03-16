import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signOut as socialLoginSignOut } from "next-auth/react";
import Cookies from "js-cookie";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { useLogoutMutation } from "@data/auth/use-logout.mutation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useUI } from "@contexts/ui.context";


export default function SignOut() {
  const { t } = useTranslation("common");
  const { unauthorize } = useUI();
  const router = useRouter();
  const { mutate,isLoading } = useLogoutMutation();
  const [logout,setLogout]=useState(false);
  useEffect(() => {
    socialLoginSignOut({ redirect: false });
    mutate();
    Cookies.remove("auth_token");
    Cookies.remove("auth_permissions");
    unauthorize();
   setLogout(true);
  }, []);
  useEffect(()=>{

    if(logout&&!isLoading){
      router.push("/"); 
    }
  },[logout,isLoading])
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <Spinner text={t("text-signing-out")} />
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
