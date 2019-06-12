import React from "react"
import { Link } from "react-router-dom"

class PortfolioPage extends React.Component {

  state = {
    positions: null
  }

  componentDidMount() {
    this.getPortfolio()
  }

  getPortfolio = () => {
    const { id } = this.props.match.params

    fetch(`https://beta.stockzoom.com/api/v1/me/portfolios/${id}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        positions: data.position
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const { positions } = this.state

    return (
      <div className="page-wrapper">
        <Link to="/">Back to overview</Link>

            <div>
              {positions && positions.map(position => {
                const { currency, name, price_today, yield_1d } = position.instrument

                return (
                  <div className="container" key={position.id}>
                    <h2>{name}</h2>
                    <div className="numbers">
                        <div className="number-header">
                          Price today:
                        </div>
                        <div className="number-value">
                          {`${price_today} ${currency}`}
                      </div>

                      <div className="number-header">
                          Yield one day:
                        </div>
                        <div className="number-value">
                          {`${yield_1d} ${currency}`}
                        </div>
                      </div>

                    </div>

                )
              })}
            </div>
      </div>
    )
  }
}

export default PortfolioPage
