import React from 'react';
import StockNewsItem from './stock_news_item';

class StockNews extends React.Component {
  render() {
    const { news } = this.props;
    return (
      <div className='news'>
        <h2>News</h2>
        <ul>
          {
            news.map((newsItem, idx) => <StockNewsItem key={idx}  newsItem={newsItem}/>)
          }
        </ul>
      </div>
    );
  }
}

export default StockNews;
