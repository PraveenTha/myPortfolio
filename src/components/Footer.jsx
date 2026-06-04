import {  FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";
import "../assets/css/footer.css";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="site-footer">
        <div className="footer-bottom">
          <div className="footer-socials">
            <SocialIcons />
          </div>
          © {year} Praveen Thakur. All rights reserved.
        </div>
      </footer>

      {/* 🔥 FLOATING CONTACT ICONS */}
   <div className="floating-contact">

  {/* CALL */}
  <a href="tel:+918527884128" className="btn call" data-title="Call">
    <FaPhone />
  </a>

  {/* WHATSAPP */}
  <a
    href="https://wa.me/918527884128?text=Hi%20%F0%9F%91%8B%0AWelcome!%20Thank%20you%20for%20your%20interest.%0A%0AI%E2%80%99ve%20received%20your%20enquiry%20and%20will%20connect%20with%20you%20shortly%20with%20complete%20details.%0ALooking%20forward%20to%20assisting%20you!%0A%0ABest%20regards%20%F0%9F%98%8A%0A%E2%80%94%20Praveen"
    target="_blank"
    rel="noopener noreferrer."
    className="btn whatsapp."
    data-title="WhatsApp"
  >
    <FaWhatsapp />
  </a>

  {/* EMAIL (Main Button) */}
  <a
    href="mailto:praveendev13101995@gmail.com"
    className="btn email."
    data-title="Email"
  >
    <FaEnvelope />
  </a>

</div>
    </>
  );
};

export default Footer;
