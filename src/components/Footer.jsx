import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
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
  <a
    href="tel:+918527884128"
    className="call"
    aria-label="Call"
  >
    <FaPhone />
  </a>

  {/* WHATSAPP */}
  <a
    href="Hi%20%F0%9F%91%8B%0AThank%20you%20for%20contacting%20me!%0AI%E2%80%99ve%20received%20your%20message%20and%20will%20connect%20with%20you%20shortly.%0AHave%20a%20great%20day%20%F0%9F%98%8A%0A%E2%80%94%20Praveen"
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp"
    aria-label="WhatsApp"
  >
    <FaWhatsapp />
  </a>

  {/* EMAIL */}
  <a
    href="mailto:praveentha8@gmail.com"
    className="email"
    aria-label="Email"
  >
    <FaEnvelope />
  </a>

</div>
    </>
  );
};

export default Footer;
