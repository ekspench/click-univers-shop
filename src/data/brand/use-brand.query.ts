import { BrandType } from "@ts-types/custom.types";
import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";

const brandService = new CoreApi(API_ENDPOINTS.BRAND);

export const fetchBrand = async () => {
  const { data } = await brandService.findAll();

  return data;
};

export const useBrandQuery = () => {
  return useQuery<BrandType[], Error>(API_ENDPOINTS.BRAND, fetchBrand);
};
