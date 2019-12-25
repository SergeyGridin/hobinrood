import React from "react";
import NavBar from "./../nav_bar/nav_bar";
import Splash from "../splash/splash";
import PortfolioChart from "../charts/portfolio_chart";
import NewsIndexContainer from "./news_index_container";
import StockIndex from "./../stocks/stock_index";
import WatchlistIndex from "./watchlist_index";
import { jsx, css } from "@emotion/core";
import { BeatLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.demoLogin = this.demoLogin.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.props.fetchCompleteUserInfo(this.props.currentUser.id);
      // if (!this.props.currentUser.portfolioData) {
      //   this.props.fetchHistoricalUserInfo(this.props.currentUser.id);
      // }
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (!prevProps.currentUser && this.props.currentUser) {
  //     prevProps.fetchUserInfo(this.props.currentUser.id);
  //   }
  // }

  demoLogin() {
    this.props.history.push({
      pathname: "/login",
      state: { isDemo: true }
    });
  }

  render() {
    const { currentUser, logout } = this.props;
    let balance,
      dailyData,
      intradayData,
      openBalance,
      balances,
      max,
      min,
      balanceChange,
      balanceChangePercentage;
    let neg = "+";
    if (currentUser && currentUser.intradayData) {
      intradayData = currentUser.intradayData;

      for (let i = intradayData.length - 1; i < intradayData.length; i--) {
        // debugger
        const element = intradayData[i];
        if (i < 0) break; // QUICK FIX
        if (element.balance !== null) {
          balance = element.balance;
          break;
        }
      }
      // balance = intradayData[intradayData.length - 1].balance;
      // dailyData = currentUser.dailyData;
      if (intradayData.length === 0) {
        openBalance = balance;
        balanceChange = "0.00";
        balanceChangePercentage = "0.00";
        max = 0;
        min = 0;
      } else {
        if (intradayData[0]) {
          openBalance = intradayData[0].balance;
        }
        balances = [];
        for (let i = 0; i < intradayData.length; i++) {
          balances.push(parseFloat(intradayData[i].balance));
        }
        max = Math.max(...balances);
        min = Math.min(...balances);
        balanceChange = Math.round((balance - openBalance) * 100) / 100;
        balanceChangePercentage =
          Math.round((balanceChange / openBalance) * 10000) / 100;
        if (balanceChange < 0) neg = "-";
      }
    }
    // removed 'currentUser.portfolioData &&' from line 86 to save some api messages use
    const display = currentUser ? (
      currentUser.intradayData ? (
        <div className="show-page">
          <div className="dashboard">
            <PortfolioChart
              currentUser={currentUser}
              balance={balance}
              openBalance={openBalance}
              // dailyData={dailyData}
              intradayData={intradayData}
              data={intradayData}
              max={max}
              min={min}
              neg={neg}
              balanceChange={balanceChange}
              balanceChangePercentage={balanceChangePercentage}
            />
            <NewsIndexContainer />
          </div>
          <aside className="side-container">
            <div className="portfolio-watchlist-container">
              <div className="portfolio">
                <h4>Stocks</h4>
                <StockIndex currentUser={currentUser} />
              </div>
              <div className="watchlist">
                <h4>Watchlist</h4>
                <WatchlistIndex currentUser={currentUser} />
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="stock-loading">
          <BeatLoader
            className={override}
            sizeUnit={"px"}
            size={25}
            color={"#21ce99"}
            loading={true}
          />
        </div>
      )
    ) : (
      <Splash />
    );

    return (
      <React.Fragment>
        <NavBar
          currentUser={currentUser}
          logout={logout}
          demoLogin={this.demoLogin}
        />
        {/* <br /> */}
        {display}
      </React.Fragment>
    );
  }
}

export default HomePage;
