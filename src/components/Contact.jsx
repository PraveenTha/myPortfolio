import { useState } from "react";
import api from "../services/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../assets/css/contact.css";
import SocialIcons from "./SocialIcons";
const Contact = () => {
  const initialForm = {
    name: "",
    email: "",
    message: "",
  };

  const [form, setForm] = useState(initialForm);
  const [phone, setPhone] = useState("");
  const [phoneKey, setPhoneKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!phone || phone.length < 8) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);

    try {
      await api.post("/contact", {
        ...form,
        phone: `+${phone}`,
      });

      setSuccess(true);
      setForm(initialForm);
      setPhone("");
      setPhoneKey((k) => k + 1);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===== CONTACT SECTION ===== */}
      <section className="contact_us">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="contact_inner">
                <div className="row">
                  {/* ===== FORM COLUMN ===== */}
                  <div className="col-md-10">
                    <div className="contact_form_inner">
                      <div className="contact_field">
                        <h3>Contact Us</h3>
                        <p>
                          Feel free to contact us any time. I will get back to
                          you as soon as I can!
                        </p>

                        <form onSubmit={submit}>
                          <input
                            type="text"
                            className="form-control form-group"
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                            required
                          />

                          <input
                            type="email"
                            className="form-control form-group"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                            required
                          />

                          {/* PHONE INPUT */}
                          <PhoneInput
                            key={phoneKey}
                            country="in"
                            enableSearch
                            countryCodeEditable={false}
                            value={phone}
                            onChange={(value) => setPhone(value)}
                            inputClass="form-control"
                            containerClass="form-group"
                            specialLabel=""
                          />

                          <textarea
                            className="form-control form-group"
                            placeholder="Message"
                            value={form.message}
                            onChange={(e) =>
                              setForm({ ...form, message: e.target.value })
                            }
                            required
                          ></textarea>

                          <button
                            type="submit"
                            className="contact_form_submit"
                            disabled={loading}
                          >
                            {loading ? "Sending..." : "Send"}
                          </button>
                        </form>

                        {success && (
                          <div className="contact-popup success">
                            ✅ Message sent successfully
                          </div>
                        )}

                        {error && (
                          <div className="contact-popup error">❌ {error}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ===== SOCIAL ICONS ===== */}
                  <div className="col-md-2">
                    <div className="right_conatct_social_icon d-flex align-items-end">
                      <div className="socil_item_inner d-flex">
                        <SocialIcons />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ===== CONTACT INFO ===== */}
                <div className="contact_info_sec">
                  <h4>Contact Info</h4>

                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-headset"></i>
                    <span>+91 8527884128</span>
                  </div>

                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-envelope-open-text"></i>
                    <a className="text-white" href="mailto:praveenthec@gmail.com" > <span>praveenthec@gmail.com</span> </a>
                  </div>

                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-map-marked-alt"></i>
                    <span>
                     D-3 Dev Building, Kunj Bihari Apartment, Shiv Durga Vihar, Lakkarpur, Faridabad, Haryana, 121009
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
