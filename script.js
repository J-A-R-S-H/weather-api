const locationForm = document.querySelector("#location-form");
const searchBoxLocation = document.querySelector("#search-box");

locationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const Usersearch = searchBoxLocation.value;
  getApi(Usersearch);
});

async function getApi(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=NVTJGNSGWVFDM7AKGC93LFYCH&contentType=json`,
    {
      mode: "cors",
    }
  );
  return response
    .json()
    .then(function (response) {
      console.log(response, "response");
      resolvedAddress = response.resolvedAddress;
      tempature = response.days[0].temp;
      maxTempature = response.days[0].tempmax;
      minTempature = response.days[0].tempmin;
      rainProbality = response.days[0].precipprob;
      humidity = response.days[0].humidity;
      windSpeed = response.days[0].windspeed;
      DateOf = response.days[0].datetime;

      console.log(
        "results:",
        resolvedAddress,
        tempature,
        maxTempature,
        minTempature,
        rainProbality,
        humidity,
        windSpeed,
        DateOf
      );

      renderAPi(
        resolvedAddress,
        tempature,
        maxTempature,
        minTempature,
        rainProbality,
        humidity,
        windSpeed,
        DateOf
      );
    })
    .catch(function (error) {
      console.log(error, "error");
    });
}

function renderAPi(
  resolvedAddress,
  tempature,
  maxTempature,
  minTempature,
  rainProbality,
  humidity,
  windSpeed,
  DateOf
) {
  const LocationAdressDom = document.querySelector(".address");
  const DateDom = document.querySelector("time");

  let reformedDate = formatDate(DateOf);

  LocationAdressDom.textContent = resolvedAddress;
  DateDom.textContent = reformedDate;
}

function formatDate(dateStr) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString("en-US", options);
}
