import React from 'react';

class StockAbout extends React.Component {

  renderShortDescription() {
    let shortDescription = this.props.stock.shortDescription;
    return (
      <p className="stock-short-description">
        {shortDescription}
      </p>
    );
  }

  financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  renderLargeNum(largeNum) {
    if (largeNum < 1000000) {
      return <h4>{this.financial(largeNum/1000)}K</h4>
    } else if (largeNum < 1000000000) {
      return <h4>{this.financial(largeNum/1000000)}M</h4>
    } else if (largeNum < 1000000000000) {
      return <h4>{this.financial(largeNum/1000000000)}B</h4>
    } else {
      return <h4>{this.financial(largeNum/1000000000000)}T</h4>
    }
  }

  toggleShow() {
    let extraList = document.getElementsByClassName('stock-facts')[2];
    let about = document.getElementsByClassName('stock-about')[0];
    let button = document.getElementsByClassName('show-toggle')[0];
    if (extraList.classList[1] === "hidden") {
      extraList.classList = "stock-facts not-hidden";
      button.textContent = "Show Less";
      about.classList = "stock-about extended";
    } else if (extraList.classList[1] === "not-hidden") {
      extraList.classList = "stock-facts hidden";
      button.textContent = "Show More";
      about.classList = "stock-about";

    }
  }

  render() {
    const { stock } = this.props;
    return (
      <div id="about" className="stock-about">
        <div className="header">
          <h2>About</h2>
          <h3 className="show-toggle" onClick={this.toggleShow}>Show More</h3>
        </div>
        {
            <div>
              {this.renderShortDescription()}
              <ul className="stock-facts">
                <li>
                  <h3>CEO</h3>
                  <h4 className='ceo'>{stock.ceo}</h4>
                </li>
                <li>
                  <h3>Industry</h3>
                  <h4>{stock.industry}</h4>
                </li>
                <li>
                  <h3>Sector</h3>
                  <h4>{stock.sector}</h4>
                </li>
                <li>
                  <h3>Exchange</h3>
                  <h4>{stock.exchange}</h4>
                </li>
              </ul>
              <ul className="stock-facts">
                <li>
                  <h3>Market Cap</h3>
                  {this.renderLargeNum(stock.marketCap)}
                </li>
                <li>
                  <h3>PE Ratio</h3>
                  <h4>{stock.peRatio}</h4>
                </li>
                <li>
                  <h3>Divident Yield</h3>
                  <h4>{stock.divYield > 0 ? stock.divYield : 'NA'}</h4>
                </li>
                <li>
                  <h3>Average Volume</h3>
                  {this.renderLargeNum(stock.avgVolume)}
                </li>
              </ul>
              <ul id="index" className="stock-facts hidden">
                <li>
                  <h3>High Today</h3>
                  <h4>${stock.high}</h4>
                </li>
                <li>
                  <h3>Low Today</h3>
                  <h4>${stock.low}</h4>
                </li>
                <li>
                  <h3>52 Week High</h3>
                  <h4>${stock.yearHigh}</h4>
                </li>
                <li>
                  <h3>52 Week Low</h3>
                  <h4>${stock.yearLow}</h4>
                </li>
              </ul>
            </div>
       
        }

      </div>
    );
  }
}

export default StockAbout;
