import axios from 'axios';
const api_url = "localhost:8000/api/get-tasks/";

const current_url = document.URL;
const required_endpt = current_url.replace("http://localhost:3000/","");
let req_url = "http://" + api_url + required_endpt;
console.log(req_url);

export const apiData = async () => {
    return await axios.get(req_url).then(function (req) {
      console.log(req.data);
      return req.data;
    })
  };