fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/vancouver?unitGroup=metric&key=NVTJGNSGWVFDM7AKGC93LFYCH&contentType=json
`)
  .then(function (response) {
    console.log(response, "response");
  })
  .catch(function (error) {
    console.log(error, "error");
  });
