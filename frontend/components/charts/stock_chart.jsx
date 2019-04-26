import React from 'react';
import StockRechart from './rechart_container';


class StockChart extends React.Component {

  render() {
    

    const { stock } = this.props;
    const { intradayData, dailyData } = stock;

    let prevDayClose = dailyData[dailyData.length - 1].close;
    let prevPrice = dailyData[dailyData.length - 1].close;


    let data = [];
    let k = 0;
    for (let i = 0; i < intradayData.length; i+=5) {
      const element = intradayData[i];
      if (element.marketClose) {
        data.push({
          time: `${element.label} ET`,
          price: element.marketClose
        });
        k++;
      }
    }

    const prices = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].price) {
        prices.push(parseFloat(data[i].price));
      }
    }

    const times = ['09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00'];

    for (k; k < times.length; k++) {
      const element = times[k];
      let ending = 'AM';
      if (parseInt(element.slice(0,2)) > 11 ) {
        ending = 'PM';
      }

      data.push({
        time: `${element} ${ending} ET`,
        price: null 
      });
    }
    if (data.length > 0) prevPrice = stock.currentPrice;
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