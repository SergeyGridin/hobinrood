import React from 'react';
import StockRechart from './rechart_container';


class StockChart extends React.Component {

  render() {
    

    const { stock } = this.props;
    const { intradayData, dailyData } = stock;

    let prevDayClose = dailyData[dailyData.length - 1].close;
    let prevPrice = dailyData[dailyData.length - 1].close;


    let data = [];
    for (let i = 0; i < intradayData.length; i+=5) {
      const element = intradayData[i];
      data.push({
        time: `${element.minute} AM ET`,
        price: element.close
      });
    }

    const prices = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].price) {
        prices.push(parseFloat(data[i].price));
      }
    }

    if (data.length > 0) prevPrice = data[data.length-1].price;
    let max = Math.max(...prices);
    let min = Math.min(...prices);
    let currPrice = Math.round(prevPrice * 100) / 100;
    let priceDiff = Math.round((parseFloat(currPrice) - parseFloat(prevDayClose)) * 100) / 100;
    let priceDiffPercentage = Math.round(((parseFloat(currPrice) - parseFloat(prevDayClose)) / parseFloat(prevDayClose)) * 10000) / 100;


    return (
      <div>
        {

          <StockRechart
            stock={stock}
            prevDayClose={prevDayClose}
            currPrice={currPrice}
            priceDiff={priceDiff}
            priceDiffPercentage={priceDiffPercentage}
            data={data}
            min={min}
            max={max}
            intradayData={intradayData}
            dailyData={dailyData}
          />

        }
      </div>
    );
  }
}

export default StockChart;