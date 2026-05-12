import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">

                <div className="footer-column">
                    <h4>ABOUT</h4>
                    <ul>
                        <li>Contact Us</li>
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Press</li>
                        <li>Corporate Information</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>GROUP COMPANIES</h4>
                    <ul>
                        <li>Myntra</li>
                        <li>Cleartrip</li>
                        <li>Shopsy</li>
                    </ul>
                </div>


                <div className="footer-column">
                    <h4>HELP</h4>
                    <ul>
                        <li>Payments</li>
                        <li>Shipping</li>
                        <li>Cancellation & Returns</li>
                        <li>FAQ</li>
                    </ul>
                </div>


                <div className="footer-column">
                    <h4>CONSUMER POLICY</h4>
                    <ul>
                        <li>Cancellation & Returns</li>
                        <li>Terms Of Use</li>
                        <li>Security</li>
                        <li>Privacy</li>
                        <li>Sitemap</li>
                    </ul>
                </div>


                <div className="footer-column wide">
                    <h4>Mail Us:</h4>
                    <p>
                        Demo Internet Private Limited,<br />
                        Chhatrapati Shivaji Nagar Chapora ,<br />
                        Burhanpur, MadhyaPradesh, India
                    </p>

                    <h4>Registered Office Address:</h4>
                    <p>
                        Demo  Internet Private Limited,<br />
                        Burhanpur, MadhyaPradesh, India
                    </p>
                </div>
            </div>

            <div className="footer-bottom">
                <div>Become a Seller</div>
                <div>Advertise</div>
                <div>Gift Cards</div>
                <div>Help Center</div>
                <div>© 2007-2026 Flipkart.com</div>
            </div>
        </footer>
    );
};

export default Footer;
