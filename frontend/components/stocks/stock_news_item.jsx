import React from 'react';

const StockNewsItem = ({ newsItem }) => {
  return (
    <li>
      <a href={newsItem.url} className="stock-news-item">
        <img src={newsItem.urlToImage} />
        <main>
          <h4>{newsItem.source.name}</h4>
          <h3>{newsItem.title}</h3>
          <p>{newsItem.description}</p>
        </main>
      </a>
    </li>
  );
};

export default StockNewsItem
