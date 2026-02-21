import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { useEffect, useState } from "react";
import api from "../services/api"; // 🔥 use central api

const ICON_MAP = {
  ...FaIcons,
  ...SiIcons,
};

const SocialIcons = () => {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const res = await api.get("/admin/settings"); 
        // baseURL already contains /api

        if (res.data?.socials) {
          setSocials(res.data.socials.filter((s) => s.enabled));
        }
      } catch (err) {
        console.error("Social fetch failed", err);
      }
    };

    fetchSocials();
  }, []);

  if (!socials.length) return null;

  return (
    <div className="social-icons">
      {socials.map((s) => {
        const Icon = ICON_MAP[s.icon];
        if (!Icon || !s.url) return null;

        return (
          <a
            key={s.platform}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={s.platform}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;