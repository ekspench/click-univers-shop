import Image from "next/image";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useAddMessageToTicket } from "@data/ticket/use-ticket-mutation";
import { useTicketQuery } from "@data/ticket/use-ticket.query";
import { Message, User } from "@ts-types/generated";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import Truncate from "@components/ui/truncate-scroll";
import Button from "@components/ui/button";
import Chat from "@components/chat/chat";
type TIcketProps = {
  id: string;
  isMobile: boolean;
  go_back: any;
};
type MessageProps = {
  message: Message;
  user: User;
};

const MessageItem = ({ message, user }: MessageProps) => {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  if (user.id !== message.user?.id) {
    return (
      <div className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <div className="px-4 py-2 rounded-lg flex flex-col inline-block rounded-bl-none bg-white ">
                <span className="font-bold mb-2">{user.name}</span>
                <span className="text-gray-600"></span>
                {message.text}
              </div>
            </div>
          </div>
          <Image
            className="relative cursor-pointer w-1 h-1 overflow-hidden rounded-full border border-border-100"
            src={
              message?.user?.profile?.avatar?.thumbnail ??
              "/avatar-placeholder.svg"
            }
            width="40px"
            height="40px"
            alt={message?.user?.name}
            objectFit="contain"
            loading="eager"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="chat-message">
        <div className="flex items-start justify-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                {message.text}
              </span>
            </div>
            <span className="text-sm text-gray-400">
              {dayjs(message.created_at).fromNow()}
            </span>
          </div>
          <Image
            className="relative cursor-pointer w-1 h-1 overflow-hidden rounded-full border border-border-100"
            width="40px"
            height="40px"
            src={
              message?.user?.profile?.avatar?.thumbnail ??
              "/avatar-placeholder.svg"
            }
            alt={message?.user?.name}
            objectFit="contain"
            loading="eager"
          />
        </div>
      </div>
    );
  }
};

const TicketShow = ({ id, isMobile, go_back }: TIcketProps) => {
  const {
    data,
    isFetching: fetchingTicket,

    refetch,
  } = useTicketQuery({ ref: id });
  const ticket = data?.ticket;
  const { isLoading: loading, data: me, error } = useCustomerQuery();
  const { mutate: addMessage } = useAddMessageToTicket();
  const [text, setText] = useState<string>("");
  const handleAddMessage = () => {
    if (ticket?.id) {
      addMessage(
        {
          ticket_id: ticket.id,
          message: {
            text: text,
          },
        },
        {
          onSuccess() {
            refetch();
            setText("");
          },
        }
      );
    }
  };
  console.log("ticket",ticket);
  return (
    <div className="w-full p:2 sm:p-6 justify-start flex flex-col h-full">
      <Button className="item-end" onClick={go_back} variant="outline">
        Fermer
      </Button>

      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        <Chat messages={ticket?.messages} title={ticket?.subject}  description={ticket?.description} user={ticket?.customer} ticket_id={ticket?.id} />
      
      </div>
   
    </div>
  );
};

export default TicketShow;
