import SectionWithCardGroup from "@components/common/section-with-card-group";
import { useCheckout } from "@contexts/checkout.context";
import { useShippingQuery } from "@data/shipping/use-shippings.query";
import { siteSettings } from "@settings/site.settings";
import { useEffect } from "react";

interface Props {
  count: number;
}

const ShippingMode = ({ count }: Props) => {
  const { updateDeliveryTime,setShippingClass,shipping_class } = useCheckout();
  useEffect(() => {
    updateDeliveryTime(siteSettings.deliverySchedule[0]);
  }, []);

  const {data, isFetching: loading,}=useShippingQuery();
  function handleSelect(item: any) {
    setShippingClass(item);
  }
  if(!data||loading){
    return<div>
      Chargement...
    </div>
  }
  console.log("shipping",shipping_class);
  return (
    <SectionWithCardGroup
      count={count}
      shipping_class={shipping_class}
      heading="text-delivery-schedule"
      items={data?.shippings.map(s=>({id:s.id,title:s.name,description:`à partir de ${s.amount} €`}))}
      onSelect={(handleSelect)}
    />
  );
};

export default ShippingMode;
