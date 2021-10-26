import Truncate from "@components/ui/truncate-scroll";
import { Ticket } from "@ts-types/generated";
import dayjs from "dayjs";
import "dayjs/locale/fr";

type TicketCardPrps = {
  ticket: Ticket;
  setActive:any;
  ticketActive:string;
};
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

dayjs.locale("fr");
const TicketCard = ({ ticket,setActive,ticketActive}: TicketCardPrps) => {
  return (
    <li className={`flex justify-between  overflow-hidden w-full items-center mt-2 p-2 hover:shadow-sm rounded cursor-pointer border-2 border-transparent  transition bg-gray-100 ${ticket.id===ticketActive&&"!border-accent"} `}
    onClick={()=>setActive(ticket.id)}
    >
      <div className="flex ml-2">
        <div className="flex flex-col ml-2">
          <span className="font-medium text-black">{ticket.subject}</span>
          <span className="text-sm text-gray-500 truncate w-32">
            <Truncate character={60}> {ticket.description}</Truncate>
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        {" "}
        <span className="text-gray-500 text-sm">
          {dayjs(ticket.created_at).fromNow()}
        </span>{" "}
        <i className="fa fa-star text-green-400" />{" "}
      </div>
    </li>
  );
};
export default TicketCard;
