export const fetchStock = (ticker) => (
  $.ajax({
    url: `api/stocks/${ticker}`
  })
);

export const fetchStocks = () => (
  $.ajax({
    url: 'api/stocks'
  })
);
