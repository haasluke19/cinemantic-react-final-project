import React from "react";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer>
      <img src={logo} alt="" className="footer__logo" />
      <ul className="footer__links">
        <a className="footer__link no-click link__hover-effect" href="#">
          About
        </a>
        <a className="footer__link link__hover-effect" href="#">
          Home
        </a>
        <a className="footer__link no-click link__hover-effect" href="#">
          Contact
        </a>
      </ul>
      <h4 className="footer__copyright">&copy;2023 Cinemantic</h4>
    </footer>
  );
}
