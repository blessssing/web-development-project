import React, { Component } from "react";
import vine from "@images/iconfinder_vine_4962002.png";
import search from "@icons/iconfinder_Search_858732.svg";
import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <section className="section-outer">
        <section className="section-inner">
          <header className="header">
            <div className="logo-wrapper">
              <a href="#">
                <img className="logo" src={vine} alt="" />
              </a>
            </div>
            <nav className="header-nav">
              <div className="header-nav-list">
                <div className="header-nav-list__item">
                  <a className="nav-link" href="#">
                    Home
                  </a>
                </div>
                <div className="header-nav-list__item">
                  <a className="nav-link" href="#">
                    My Projects
                  </a>
                </div>
                <div className="header-nav-list__item">
                  <a className="nav-link" href="#">
                    About Me
                  </a>
                </div>
              </div>
            </nav>
            <div className="wrapper-search">
              <form>
                <button className="search-btn pointer" type="submit"></button>
              </form>
            </div>
          </header>
        </section>
      </section>
    );
  }
}

export default Header;
