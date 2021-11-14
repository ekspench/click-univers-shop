import Button from "@components/ui/button";
import Input from "@components/ui/input";
//import Label from "@components/ui/label";
//import Radio from "@components/ui/radio/radio";
import TextArea from "@components/ui/text-area";
import { useState } from "react";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import SelectAutoComplete from "@components/ui/SelectAutoComplete";

type FormValues = {
  title: string;
  type: string;
  address: {
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
};

const addressSchema = yup.object().shape({
  type: yup.string().required("error-type-required"),
  title: yup.string().required("error-title-required"),
  address: yup.object().shape({
    country: yup.string().required("error-country-required"),
    city: yup.string().required("error-city-required"),
    state: yup.string().required("error-state-required"),
    zip: yup.string().required("error-zip-required"),
    street_address: yup.string().required("error-street-required"),
  }),
});

const CreateOrUpdateAddressForm = () => {
  const { t } = useTranslation();
  const [listAddresses, setListAddresses] = useState([]);
  const [addressSearch, setAddressSearch] = useState<any>();
  const {
    data: { customerId, address, type },
  } = useModalState();
  const { closeModal } = useModalAction();
  const { mutate: updateProfile } = useUpdateCustomerMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      title: address?.title ?? "",

      type: "standard" /*address?.type ?? type*/,
      /*...(address?.address && address),*/
      address: {
        ...address,
        country: "France",
      },
    },
  });

  const selectAddress = (i: { value: string }) => {
    axios
      .get(
        "https://geo.api.gouv.fr/communes/" +
          i.value +
          "?fields=nom,code,codesPostaux,centre,codeDepartement,departement,codeRegion,region,population&format=json&geometry=centre"
      )
      .then((response) => {
        const data = response.data;
        console.log(response.data);
        setValue("address.city", data.nom.toUpperCase());
        setValue("address.zip", data.codesPostaux[0]);
        setValue("address.state", data.departement.nom);
        /* setFieldValue("lng", data.codesPostaux[0]);
      setFieldValue("lat", data.centre.coordinates[1]);*/
        /*setFieldValue("placeId", i.value);*/
      })
      .catch((err) => console.log("erreur", err));
  };

  const loadOptions = (
    val: string | any[] | ((prevState: never[]) => never[])
  ) => {
    setListAddresses([]);
    let params = "";
    let find = false;
    if (isNaN(Number(val))) {
      params = "nom";
      if (val.length >= 3) {
        find = true;
      }
    } else {
      params = "codePostal";
      if (val.length >= 5) {
        find = true;
      }
    }
    if (find) {
      return axios
        .get("https://geo.api.gouv.fr/communes?" + params + "=" + val)
        .then((response) => {
          return response.data.map(
            (item: { nom: string; codesPostaux: string[]; code: any }) => {
              return {
                label:
                  item.nom.toUpperCase() + " (" + item.codesPostaux[0] + ")",
                value: item.code,
              };
            }
          );
        })
        .catch((err) => console.log(err));
    }
    setAddressSearch(val);
  };

  function onSubmit(values: FormValues) {
    const formattedInput = {
      id: address?.id,
      customer_id: customerId,
      title: values.title,
      type: values.type,
      address: {
        ...(address?.id ? { id: address.id } : {}),
        ...values.address,
      },
    };

    updateProfile({
      id: customerId,
      address: [formattedInput],
    });
    return closeModal();
  }
  return (
    <div className="p-5 sm:p-8 bg-light">
      <h1 className="text-heading font-semibold text-lg text-center mb-4 sm:mb-6">
        {address ? t("text-update") : t("text-add-new")} {t("text-address")}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-2 gap-5 h-full"
      >
        <div>
          {/**
          * 
          *  <Label>{t("text-type")}</Label>

          <div className="space-s-4 flex items-center">
            <Radio
              id="billing"
              {...register("type")}
              type="radio"
              value="billing"
              label={t("text-billing")}
            />

            <Radio
              id="shipping"
              {...register("type")}
              type="radio"
              value="shipping"
              label={t("text-shipping")}
            />
          </div>
          */}
        </div>

        <Input
          label={t("text-title")}
          {...register("title")}
          error={t(errors.title?.message!)}
          variant="outline"
          className="col-span-2"
        />
        <div className="col-span-2">
          <SelectAutoComplete
          placeholder="Code postal"
            loadOptions={loadOptions}
            onChange={selectAddress}
          />
        </div>

        <Input
          label={t("text-country")}
          {...register("address.country")}
          error={t(errors.address?.country?.message!)}
          variant="outline"
        />
        {watch("address.city") && (
          <Input
            label={t("text-city")}
            {...register("address.city")}
            error={t(errors.address?.city?.message!)}
            variant="outline"
          />
        )}

        {watch("address.state") && (
          <Input
            label={t("text-state")}
            {...register("address.state")}
            error={t(errors.address?.state?.message!)}
            variant="outline"
          />
        )}

        {watch("address.zip") && (
          <Input
            label={t("text-zip")}
            {...register("address.zip")}
            error={t(errors.address?.zip?.message!)}
            variant="outline"
          />
        )}

        <TextArea
          label={t("text-street-address")}
          {...register("address.street_address")}
          error={t(errors.address?.street_address?.message!)}
          variant="outline"
          className="col-span-2"
        />

        <Button className="w-full col-span-2">
          {address ? t("text-update") : t("text-save")} {t("text-address")}
        </Button>
      </form>
    </div>
  );
};

export default CreateOrUpdateAddressForm;
