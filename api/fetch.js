import axios from "axios";

//Set up base back end URL
let baseURL = "http://127.0.0.1:3000/api/v1/";

const makeRequest = axios.create({
  baseURL: baseURL,
});

const fetchData = async (url, req) => {
  let response;
  let error;
  try {
    response = await makeRequest({
      url: url,
      method: req.method,
      data: req.payload,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: req?.token,
      },
    });
  } catch (err) {
    error = err;
    //    console.log(err);
  }

  return { response, error };
};

export default fetchData;
