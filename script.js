async function getApi() {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/vancouver?unitGroup=metric&key=NVTJGNSGWVFDM7AKGC93LFYCH&contentType=json`,
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

      console.log(
        "results",
        resolvedAddress,
        tempature,
        maxTempature,
        minTempature,
        rainProbality,
        humidity,
        windSpeed
      );
    })
    .catch(function (error) {
      console.log(error, "error");
    });
}

getApi();
