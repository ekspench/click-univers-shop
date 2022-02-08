import dayjs from "dayjs"
require("dayjs/locale/fr");
dayjs.locale("fr");

export const formatDateComplet=(date:string)=>{
    if(date===undefined){
        return "";
    }
    return dayjs(date).format("DD MMMM YYYY");
}