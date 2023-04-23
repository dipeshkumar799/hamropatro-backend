import axios from "axios";
const getForex = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

  const newDate = [year, month, day].join("-"); //join(_) indicates 2023-04-21
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://www.nrb.org.np/api/forex/v1/rates?page=1&per_page=30&from=${newDate}&to=${newDate}`,
  };
  try {
    const response = await axios.request(config);
    return response.data.data.payload[0].rates;
  } catch (err) {
    throw new Error(err);
  }
};

export default getForex;
