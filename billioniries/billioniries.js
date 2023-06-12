import axios from "axios";
const getBillionarie = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://forbes-worlds-billionaires-list.p.rapidapi.com/billionaires/2021?page=1&size=10&year=2023",
    headers: {
      "X-RapidAPI-Key": "f1f9901099msh2dd8c6dd067db51p1e3c6ejsn97b6612a9706",
      "X-RapidAPI-Host": "forbes-worlds-billionaires-list.p.rapidapi.com",
    },
  };

  const response = await axios.request(config);

  return response.data.personLists;
};

export default getBillionarie;
