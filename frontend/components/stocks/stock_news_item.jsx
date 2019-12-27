import React from "react";

const StockNewsItem = ({ newsItem }) => {
  return (
    <li className="stock-news-item-container">
      <a href={newsItem.url} className="stock-news-item">
        <img src={newsItem.urlToImage} />
        <main>
          <section className="source">
            <h4>{newsItem.source.name}</h4>
            <h3>{newsItem.title}</h3>
          </section>
          <p>{newsItem.description}</p>
        </main>
      </a>
    </li>
  );
};

export default StockNewsItem;
