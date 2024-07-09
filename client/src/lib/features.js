import moment from "moment";

const fileformat = (url="")=>{


const fileExt = url.split(".").pop();

if(fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";

if(fileExt === "mp3" || fileExt === "wav" ) return "audio";

if(
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"

)   return "image";


return "file";


};

const getLast7Days =()=>{
 const currentDate = moment();

 const last7Days = [];

 for(let i=0; i<7; i++)
    {
        const dayDate = currentDate.clone().subtract(i, "days");
        const dayName = dayDate.format("dddd");
        last7Days.unshift(dayName);
    }

    return last7Days;
};

const transformImage = (url= "",width = 200) =>url;


export {fileformat,transformImage, getLast7Days};