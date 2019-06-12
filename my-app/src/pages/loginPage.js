import React, { Component } from "react";
import { Link } from "react-router-dom";

class LoginPage extends Component {
    state = {
      email: "",
      password: "",
      portfolios: null
    }

    handleLogin = event => {
      event.preventDefault()

      const { email, password } = this.state
      const user = { email, password }

      fetch("https://beta.stockzoom.com/api-token-auth/", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("token", data.token)
        this.getPortfolios()
      })
      .catch(err => {
        console.log(err)
      })
    }

    getPortfolios = () => {
      fetch("https://beta.stockzoom.com/api/v1/me/portfolios/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          portfolios: data.results
        })
      })
      .catch(err => {
        console.log(err)
      })
    }

    componentDidMount() {
      if (localStorage.getItem("token")) {
        this.getPortfolios()
      }
    }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    handleLogout = () => {
      localStorage.removeItem("token")
      this.setState({
        portfolios: null
      })
    }


    render() {
        const { email, password, portfolios } = this.state

        if (localStorage.getItem("token")) {
          console.log(portfolios)
          return (
            <div className="container">
              <div className="portfolio-wrapper">
                <div className="button"><button onClick={this.handleLogout}>Log out</button></div>
                    <h1 className="heading">My portfolios</h1>
                    <div className="portfolios">
                      {portfolios && portfolios.map((listing, index) => (
                        <Link
                          key={listing.id}
                          to={`/portfolios/${listing.id}`}>
                            <div className="link">
                              <h4 className="portfolio-name">Portfolio {index + 1} </h4>
                                <div className="portfolio-values">Available cash: {listing.available_cash} {listing.currency}</div>
                                <div className="portfolio-values">Market value: {listing.market_value} {listing.currency}</div>
                            </div>
                        </Link>
                      ))}
                    </div>
                  </div>
            </div>
          )
        } else {
          return (
            <div className="container">
              <div className="login-wrapper">
                <h1 className="heading">Log in</h1>
                <form className="login" onSubmit={this.handleLogin}>
                 <div className="input-container">
                    <label className="input-label" htmlFor="email"><p>Email:</p></label>
                    <input
                      className="input-field"
                      name="email"
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={this.handleChange}
                      required />
                  </div>
                  <div className="input-container">
                    <label className="input-label" htmlFor="password"><p>Password:</p></label>
                    <input
                      className="input-field"
                      name="password"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={this.handleChange}
                      required />
                  </div>
                  <div className="button"><button type="submit">Sign in</button></div>
                </form>
                </div>
              </div>
            )
        }
      }
    }

export default LoginPage
