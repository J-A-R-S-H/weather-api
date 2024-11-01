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
      tempature = response.currentConditions.temp;
      maxTempature = response.days[0].tempmax;
      minTempature = response.days[0].tempmin;
      rainProbality = response.currentConditions.precipprob;
      humidity = response.currentConditions.humidity;
      windSpeed = response.currentConditions.windspeed;
      dateOf = response.days[0].datetime;
      epochTime = response.currentConditions.datetimeEpoch;
      weatherConditions = response.currentConditions.conditions;
      console.log(
        "results:",
        resolvedAddress,
        tempature,
        maxTempature,
        minTempature,
        rainProbality,
        humidity,
        windSpeed,
        dateOf,
        epochTime,
        weatherConditions
      );

      renderAPi(
        resolvedAddress,
        tempature,
        maxTempature,
        minTempature,
        rainProbality,
        humidity,
        windSpeed,
        dateOf,
        epochTime,
        weatherConditions
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
  dateOf,
  epochTime,
  weatherConditions
) {
  const locationAdressDom = document.querySelector(".address");
  const dateDom = document.querySelector("time");
  const epochTimeDom = document.querySelector("#epoch-time");
  const currentTempatureDom = document.querySelector("#current-temp");
  const minmaxTempatureDom = document.querySelector(".minmax-tempature");
  const currentConditionsDom = document.querySelector("#current-conditions");
  const rainPercentageDom = document.querySelector("#rain-percentage");
  const windSpeedDom = document.querySelector("#wind-speed");
  const humidityDom = document.querySelector("#humidity");

  let reformedDate = formatDate(dateOf);
  let reformedEpochDate = convertEpochTo24Hour(epochTime);

  locationAdressDom.textContent = resolvedAddress;
  dateDom.textContent = reformedDate;
  epochTimeDom.textContent = reformedEpochDate;
  currentTempatureDom.textContent = `${tempature}°c`;
  minmaxTempatureDom.textContent = `${minTempature}°c / ${maxTempature}°c`;
  currentConditionsDom.textContent = weatherConditions;
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

function convertEpochTo24Hour(epoch, useUTC = false) {
  const date = new Date(epoch * 1000);

  const hours = useUTC
    ? String(date.getUTCHours()).padStart(2, "0")
    : String(date.getHours()).padStart(2, "0");
  const minutes = useUTC
    ? String(date.getUTCMinutes()).padStart(2, "0")
    : String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}
