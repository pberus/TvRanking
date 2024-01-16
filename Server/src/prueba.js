const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/122?language=en-US',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjEyYzc0Y2FmYjk5MTM3OTQ4ZGMzYThkMGU0M2RjMyIsInN1YiI6IjY1YTVhODA3YTgwNjczMDEyODQ3MWY0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DsC3Hc_DM0SjY-Va5ed7AbZo19Ue7nM3smM0WUOnBV4'
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });