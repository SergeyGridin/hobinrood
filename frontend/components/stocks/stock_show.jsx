import React from "react";
import NavBar from "../nav_bar/nav_bar";
import StockChart from "../charts/stock_chart";
import StockAbout from "./stock_about";
import StockNews from "./stock_news";
import StockTransaction from "./stock_transaction";
import { jsx, css } from "@emotion/core";
import { BeatLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class StockShow extends React.Component {
  componentDidMount() {
    this.props.fetchStock(this.props.match.params.ticker);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.ticker !== prevProps.match.params.ticker) {
      const ticker = this.props.match.params.ticker;
      this.props.fetchStock(ticker);
    }
  }

  render() {
    const {
      currentUser,
      logout,
      stock,
      createTransaction,
      fetchUserInfo,
      errors,
      receiveErrors
    } = this.props;
    return (
      <React.Fragment>
        <NavBar currentUser={currentUser} logout={logout} />
        {stock && stock.intradayData && stock.dailyData ? (
          <div className="show-page col-1">
            <div className="dashboard">
              <StockChart stock={stock} />
              <div className="side-container">
                <StockTransaction
                  currentUser={currentUser}
                  stock={stock}
                  createTransaction={createTransaction}
                  fetchUserInfo={fetchUserInfo}
                  errors={errors}
                  receiveErrors={receiveErrors}
                />
              </div>
              <StockAbout stock={stock} />
              <StockNews news={stock.news} />
            </div>
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
        )}
      </React.Fragment>
    );
  }
}

export default StockShow;
