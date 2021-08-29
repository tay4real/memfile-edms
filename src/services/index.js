import axios from "axios";

//export const fetchBackend = axios.create({
  //baseURL:
    //process.env.NOD_ENV === "production"
    //  ? process.env.REACT_APP_BACKEND_URL
    //  : process.env.REACT_APP_DEV_BACKEND_URL,
  //headers: {
  //  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
   // "Content-type": "application/json",
  //},
//});


export const fetchBackend = axios.create({
baseURL: process.env.REACT_APP_BACKEND_URL,
 headers: {
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
 "Content-type": "application/json",
},
});
