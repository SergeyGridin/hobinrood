export const fetchNews = () => (
  $.ajax({
    url: 'https://newsapi.org/v2/top-headlines?apiKey=53eeb325d1d34dd19167158c3aa45798&language=en&category=business&country=us'
  })
);
