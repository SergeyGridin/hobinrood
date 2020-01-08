import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import CustomTooltip from "./custom_tooltip";

const RANGES = {
  "1W": { length: 5, increment: 1 },
  "1M": { length: 23, increment: 1 },
  "3M": { length: 66, increment: 1 },
  "1Y": { length: 250, increment: 1 },
  "5Y": { length: 1258, increment: 5 }
};

const MONTHS = {
  1: "JAN",
  2: "FEB",
  3: "MAR",
  4: "APR",
  5: "MAY",
  6: "JUN",
  7: "JUL",
  8: "AUG",
  9: "SEP",
  10: "OCT",
  11: "NOV",
  12: "DEC"
};

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currData: this.props,
      initialData: this.props,
      active: "1D"
    };
    this.render1DChart = this.render1DChart.bind(this);
    this.render1WChart = this.render1WChart.bind(this);
    this.render1MChart = this.render1MChart.bind(this);
    this.render3MChart = this.render3MChart.bind(this);
    this.render1YChart = this.render1YChart.bind(this);
    this.renderAllChart = this.renderAllChart.bind(this);
  }

  componentDidMount() {
    this.render1DChart();
  }

  calculateDailyPriceData(data, startIdx) {
    let { portfolioData } = this.state.initialData;
    let neg = "+";
    const prices = [];

    if (startIdx < 0) startIdx = 0;
    for (let i = 0; i < data.length; i++) {
      prices.push(parseFloat(data[i].price));
    }

    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const currPrice = this.state.initialData.currPrice;
    const openPrice = portfolioData[startIdx].close;
    const priceDiff =
      Math.round((parseFloat(currPrice) - parseFloat(openPrice)) * 100) / 100;
    const priceDiffPercentage =
      Math.round(
        ((parseFloat(currPrice) - parseFloat(openPrice)) /
          parseFloat(openPrice)) *
          10000
      ) / 100;
    if (priceDiff < 0) neg = "-";

    return {
      max,
      min,
      neg,
      currPrice,
      openPrice,
      priceDiff,
      priceDiffPercentage
    };
  }

  formatDate(date) {
    let [year, month, day] = date.split("-");

    return `${MONTHS[parseInt(month)]} ${day}, ${year}`;
  }

  renderChart(range) {
    let { portfolioData } = this.state.initialData;
    let data = [];
    let startIdx = RANGES[range].length;
    if (startIdx > portfolioData.length) startIdx = portfolioData.length;

    for (
      let i = portfolioData.length - startIdx;
      i < portfolioData.length;
      i += RANGES[range].increment
    ) {
      let priceOrBalance = portfolioData[i].close || portfolioData[i].balance;
      let time = this.formatDate(portfolioData[i].date);
      data.push({
        time,
        price: Math.round(priceOrBalance * 100) / 100
      });
    }

    let {
      max,
      min,
      neg,
      currPrice,
      openPrice,
      priceDiff,
      priceDiffPercentage
    } = this.calculateDailyPriceData(data, portfolioData.length - startIdx - 1);
    this.setState({
      currData: {
        data,
        currPrice,
        openPrice,
        priceDiff,
        priceDiffPercentage,
        min,
        max,
        neg,
        portfolioData
      },
      active: range
    });
  }

  render1DChart() {
    this.setState({ currData: this.state.initialData, active: "1D" });
  }

  render1WChart() {
    // this.setState({ currData: this.state.initialData, active: "1D" });
  }

  render1MChart() {
    // this.setState({ currData: this.state.initialData, active: "1D" });
  }

  render3MChart() {
    // this.setState({ currData: this.state.initialData, active: "1D" });
  }

  render1YChart() {
    // this.setState({ currData: this.state.initialData, active: "1D" });
  }

  renderAllChart() {
    // this.setState({ currData: this.state.initialData, active: "1D" });
  }

  render() {
    let { currentUser } = this.props;
    let {
      balance,
      balanceChange,
      balanceChangePercentage,
      openBalance,
      data,
      min,
      max,
      neg
    } = this.state.currData;

    let color = neg === "+" ? "#82ca9d" : "#f45531";
    if (neg === "-") {
      document.getElementsByTagName("body")[0].className = "negative";
    } else {
      document.getElementsByTagName("body")[0].className = "";
    }
    balance = parseFloat(balance);
    balanceChange = Math.abs(parseFloat(balanceChange));
    balanceChangePercentage = parseFloat(balanceChangePercentage);
    let key = this.state.active == "1D" ? "balance" : "price";
    // debugger;
    return (
      <div className="chart">
        <h2 id="portfolio-balance">${balance}</h2>
        <h3 id="portfolio-balance-flux">
          {neg}${balanceChange} ({balanceChangePercentage}%)
        </h3>
        <div className="stock-chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <YAxis hide={true} domain={[min, max]} />
              <Tooltip
                content={<CustomTooltip />}
                offset={-40}
                position={{ y: -20 }}
                isAnimationActive={true}
              />
              <Line
                type="linear"
                dataKey={key}
                stroke={color}
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <ul className="chart-range">
            <li>
              <a
                className={
                  this.state.active === "1D"
                    ? "chart-choice active"
                    : "chart-choice"
                }
                onClick={this.render1DChart}
              >
                1D
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.active === "1W"
                    ? "chart-choice active"
                    : "chart-choice"
                }
                onClick={() => this.renderChart("1W")}
              >
                1W
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.active === "1M"
                    ? "chart-choice active"
                    : "chart-choice"
                }
                onClick={() => this.renderChart("1M")}
              >
                1M
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.active === "3M"
                    ? "chart-choice active"
                    : "chart-choice"
                }
                onClick={() => this.renderChart("3M")}
              >
                3M
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.active === "1Y"
                    ? "chart-choice active"
                    : "chart-choice"
                }
                onClick={() => this.renderChart("1Y")}
              >
                1Y
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.active === "5Y"
                    ? "chart-choice active"
                    : "chart-choice"
                }
                onClick={() => this.renderChart("5Y")}
              >
                5Y
              </a>
            </li>
            {/* <li><a className={this.state.active === '1W' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1WChart}>1W</a></li>
            <li><a className={this.state.active === '1M' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1MChart}>1M</a></li>
            <li><a className={this.state.active === '3M' ? 'chart-choice active' : 'chart-choice'} onClick={this.render3MChart}>3M</a></li>
            <li><a className={this.state.active === '1Y' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1YChart}>1Y</a></li>
            <li><a className={this.state.active === 'ALL' ? 'chart-choice active' : 'chart-choice'} onClick={this.renderAllChart}>ALL</a></li> */}
          </ul>
        </div>
      </div>
    );
  }
}

export default PortfolioChart;
