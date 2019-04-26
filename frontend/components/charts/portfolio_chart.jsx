import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import CustomTooltip from './custom_tooltip';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currData: this.props,
      initialData: this.props,
      active: '1D'
    };
    this.render1DChart = this.render1DChart.bind(this);
  }
  componentDidMount() {
    this.render1DChart();
  }

  render1DChart() {
    this.setState({ currData: this.state.initialData, active: '1D' }); 
  }


  render() {
    let { currentUser } = this.props;
    let { balance, balanceChange, balanceChangePercentage, openBalance, data, min, max, neg } = this.state.currData;

    let color = (neg === '+') ? "#82ca9d" : "#f45531";
    if (neg === '-') {
      document.getElementsByTagName('body')[0].className = 'negative';
    } else {
      document.getElementsByTagName('body')[0].className = '';
    }
    balance = parseFloat(balance);
    balanceChange = Math.abs(parseFloat(balanceChange));
    balanceChangePercentage = parseFloat(balanceChangePercentage);
    
    return (
      <div className="chart">
        <h2 id="portfolio-balance">${balance}</h2>
        <h3 id="portfolio-balance-flux">{neg}${balanceChange} ({balanceChangePercentage}%)</h3>
        <div className="stock-chart">
          <LineChart width={710} height={195} data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <YAxis
              hide={true}
              domain={[min, max]}
              />
            <Tooltip
              content={<CustomTooltip  />}
              offset={-40}
              position={{ y: -20 }}
              isAnimationActive={true}
            />
          <Line type="linear" dataKey="balance" stroke={color} dot={false} strokeWidth={2} />
          </LineChart>
          <ul className="chart-range">
            <li><a className={this.state.active === '1D' ? 'chart-choice active' : 'chart-choice'} onClick={this.render1DChart}>1D</a></li>
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
