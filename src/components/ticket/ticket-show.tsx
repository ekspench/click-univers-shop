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
  return (
    <div className="w-full p:2 sm:p-6 justify-start flex flex-col h-full">
      <Button className="item-end" onClick={go_back} variant="outline">
        Fermer
      </Button>
      <div className="flex items-center justify-between  border-b-2 border-gray-200 bg-white my-2 p-4 rounded">
        <div className="flex items-center space-x-4 ">
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">{ticket?.subject}</span>
              <span className="text-green-500"> </span>
            </div>
            <span className="text-sm text-gray-600">
              <Truncate buttonText="plus">{ticket?.description ?? ""}</Truncate>
            </span>
          </div>
        </div>
        {/** 
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
          */}
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        {ticket?.messages.map((message) => (
          <MessageItem key={message.id} user={me.me} message={message} />
        ))}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <span className="absolute inset-y-0 flex items-center">
            {/**
              * <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>
              */}
          </span>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            placeholder="Ecricre quelque chose"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-white rounded-full py-3"
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            {/*
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>*/}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              onClick={handleAddMessage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketShow;
