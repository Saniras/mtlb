const fetch = require("node-fetch");

const getOptions = () => {
  return {
    method: "GET",
    headers: {
      scheme: "https",
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "ko,en;q=0.9,en-US;q=0.8",
      dnt: "1",
      referer: "https://www.aishub.net/coverage",
      "sec-ch-ua":
        '"Microsoft Edge";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50",
      "x-requested-with": "XMLHttpRequest",
    },
  };
};

const fetchAPI = (url, options) => {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) =>
      console.log({ error: "An error occurred while fetching data" })
    );
};

const index = async (req, res) => {
  const url =
    "https://www.aishub.net/coverage.json?minLat=-13.41099&maxLat=54.26522&minLon=-274.04297&maxLon=302.87109&zoom=2&view=false&t=1684857267";
  const options = getOptions();

  try {
    const data = await fetchAPI(url, options); // Using await here
    console.log(data); // Add this line
    res.render("ports/index", { data }); // Render the 'index' view in the 'ports' directory
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

const getRealtimeData = (req, res) => {
  const url = `https://www.aishub.net/station/${req.params.id}/realtime.json`;
  const options = getOptions();

  fetchAPI(url, options).then((data) => res.json(data));
};

const getWeeklyStatistics = (req, res) => {
  const url = `https://www.aishub.net/station/${req.params.id}/weekly-statistics.json`;
  const options = getOptions();

  fetchAPI(url, options).then((data) => res.json(data));
};

const getMonthlyStatistics = (req, res) => {
  const url = `https://www.aishub.net/station/${req.params.id}/monthly-statistics.json`;
  const options = getOptions();

  fetchAPI(url, options).then((data) => res.json(data));
};

const getYearlyStatistics = (req, res) => {
  const url = `https://www.aishub.net/station/${req.params.id}/yearly-statistics.json`;
  const options = getOptions();

  fetchAPI(url, options).then((data) => res.json(data));
};

module.exports = {
  index,
  getRealtimeData,
  getWeeklyStatistics,
  getMonthlyStatistics,
  getYearlyStatistics,
};
