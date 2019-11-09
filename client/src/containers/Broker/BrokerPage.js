import React, { Component } from "react";
import axios from "axios";

import "./BrokerPage.css";

class BrokerPage extends Component {
  state = {
    stocks: null,
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
    axios
      .get(
        "https://my4wv99yv6.execute-api.us-east-1.amazonaws.com/default/fetch_stock_data"
      )
      .then(res => this.setState({ stocks: res.data }))
      .catch(err => {
        console.log(err);
      });
  }

  changeTarget = (stock) => {
    let price = parseInt(this.state.stocks[stock].price)
    let target = parseInt(this.state[stock])
    let share = {
      name: stock,
      target: target,
      condition: price > target ? "buy" : "sell",
      state: target === 0 ? false : true
    }
    axios.post('/stocks/set', share)
      .then(res => console.log(res))
      .catch(err => { console.log(err) })

    this.setState({[stock]: ""})
  }

  render() {
    let { stocks } = this.state;
    return (
      <div className="flex-1 px-4 pb-3 lg:py-3">
        <div className="flex font-bold text-3xl text-tekno3">
          Hisse Senetleri
        </div>
        <table className="rwd-table">
          <tr>
            <th>Hisse</th>
            <th>Tarih</th>
            <th>Fiyat</th>
            <th>Açılış</th>
            <th>Low</th>
            <th>High</th>
            <th>Değişim</th>
            <th>Değişim %</th>
            <th>52h high</th>
            <th>52h low</th>
            <th>Volume</th>
            <th>Hedef</th>
            <th></th>
          </tr>
          {stocks
            ? Object.keys(stocks).map(stock => {
                return (
                  <tr key={stock}>
                    <td data-th="Hisse">{stock}</td>
                    <td data-th="Tarih">{stocks[stock]["date"]}</td>
                    <td data-th="Fiyat">{stocks[stock]["price"]}</td>
                    <td data-th="Açılış">{stocks[stock]["open"]}</td>
                    <td data-th="Low">{stocks[stock]["low"]}</td>
                    <td data-th="High">{stocks[stock]["high"]}</td>
                    <td data-th="Değişim">{stocks[stock]["day_change"]}</td>
                    <td data-th="Değişim %">{stocks[stock]["change_pct"]}</td>
                    <td data-th="52h high">{stocks[stock]["52high"]}</td>
                    <td data-th="52h low">{stocks[stock]["52low"]}</td>
                    <td data-th="Volume">{stocks[stock]["volume"]}</td>
                    <td>
                      <input
                        className=" shadow appearance-none border rounded w-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="target"
                        name={stock}
                        type="number"
                        onChange={this.handleInputChange}
                        value={this.state[stock]}
                      />
                    </td>
                    <td>
                      <div
                        onClick={() => this.changeTarget(stock)}
                        className="inline-block cursor-pointer text-xs py-2 leading-none border rounded-lg bg-tekno3 text-white border-white hover:border-tekno3 hover:text-tekno3 hover:bg-transparent"
                      >
                        Gönder
                      </div>
                    </td>
                  </tr>
                );
              })
            : null}
        </table>
      </div>
    );
  }
}

export default BrokerPage;
