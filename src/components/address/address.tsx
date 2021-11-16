import SectionWithCardGroup from "@components/common/section-with-card-group";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useCheckout } from "@contexts/checkout.context";
import { loggedIn } from "@utils/is-loggedin";
import { useEffect } from "react";

interface Props {
  id: string;
  heading: string;
  addresses: any[] | undefined;
  count?: number;
  type?: "billing" | "shipping";
}

const Address = ({ id, addresses, heading, count, type }: Props) => {
  const { openModal } = useModalAction();
  const { updateBillingAddress, updateShippingAddress } = useCheckout();
  useEffect(() => {
    if (addresses) {
      updateBillingAddress(addresses[0]);
      updateShippingAddress(addresses[0]);
    }
  }, [addresses]);
  function handleAdd() {
    if (loggedIn()) {
      return openModal("ADD_OR_UPDATE_ADDRESS", { customerId: id, type });
    } else {
      openModal("LOGIN_VIEW");
    }
  }
  function handleEdit(address: any) {
    return openModal("ADD_OR_UPDATE_ADDRESS", { customerId: id, address });
  }
  function handleDelete(address: any) {
    return openModal("DELETE_ADDRESS", {
      customerId: id,
      addressId: address.id,
    });
  }
  function handleSelect(item: any) {
    /* if (type === "billing") {
      console.log("item on set address",item);
      updateBillingAddress(item);
    } else {
      updateShippingAddress(item);
    }*/
    updateBillingAddress(item);
    updateShippingAddress(item);
  }
  return (
    <SectionWithCardGroup
      count={count}
      heading={heading}
      addActionText="text-address"
      items={addresses}
      defaultChecked={0}
      onSelect={handleSelect}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default Address;
