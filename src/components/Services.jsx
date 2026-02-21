import { useEffect, useState } from "react";
import api from "../services/api";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import "../assets/css/services.css";

const iconMap = {
  ...FaIcons,
  ...MdIcons,
};

const Services = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/services").then((res) => setData(res.data));
  }, []);

  if (!data.length) return null;

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="services-wrapper">
          
          <div className="services-grid">
            {data.map((s) => {
              const Icon = iconMap[s.icon];

              return (
                <div className="service-card" key={s._id}>
                  {Icon && <Icon className="service-icon" />}
                  <h5>{s.title}</h5>

                  <ul>
                    {s.points.map((p, i) => (
                      <li key={i}>
                        <i className="fa-solid fa-check"></i>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
