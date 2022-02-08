import Card from "@components/ui/card";
import * as yup from "yup";
import { IbanValidation } from "@utils/iban";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { Button, Input } from "..";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { User } from "@ts-types/generated";
import { toast } from "react-toastify";
type Props={
    user:User;
}
type FormValue = {
  name: string;
  email: string;
  bank: string;
  account: string;
};
const schemaValidation = yup.object().shape({
  name: yup.string().required("Nom requis!"),
  email: yup
    .string()
    .email("error-email-format")
    .required("error-email-required"),
  bank: yup.string().required("Banque requis!"),
});

const PaymentInfo = ({ user }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ resolver: yupResolver(schemaValidation) ,
  defaultValues:user?.balance?.payment_info});
  const { t } = useTranslation("common");
  const { mutate: updateProfile, isLoading: loading } =
  useUpdateCustomerMutation();
  return (
    <>
      <Card className="w-full mt-5">
        <div className="flex items-center mb-5 space-s-3 md:space-s-4">
          <p className="text-lg lg:text-xl text-heading">
            Coordonnées bancaire
          </p>
        </div>
        <form onSubmit={handleSubmit((values)=>{
            updateProfile({
                id: user.id,
                payment_info:values,
            },
            {
                onSuccess: () => {
                  toast.success(t("payment-info-update-successful"));
                },
              })
        })}>
          <Input
            label={t("input-label-account-holder-name")}
            {...register("name")}
            variant="outline"
            className="mb-5"
            error={t(errors.name?.message!)}
          />
          <Input
            label={t("input-label-account-holder-email")}
            {...register("email")}
            variant="outline"
            className="mb-5"
            error={t(errors.email?.message!)}
          />
          <Input
            label={t("input-label-bank-name")}
            {...register("bank")}
            variant="outline"
            className="mb-5"
            error={t(errors.bank?.message!)}
          />
          <Input
            label={t("input-label-account-number") + "*"}
            {...register("account", {
              required: true,
              validate: IbanValidation,
            })}
            variant="outline"
            error={errors.account?.type && "Numero de compte Invalide"}
          />
          <div className="flex justify-end mt-5">
            <Button loading={loading} type="submit">Enregistrer</Button>
          </div>
        </form>
      </Card>
    </>
  );
};
export default PaymentInfo;
