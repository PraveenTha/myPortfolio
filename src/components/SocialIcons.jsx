import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import axios from "axios";
import { useEffect, useState } from "react";

const ICON_MAP = {
  ...FaIcons,
  ...SiIcons,
};

const SocialIcons = () => {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/settings")
      .then((res) => {
        if (res.data?.socials) {
          setSocials(res.data.socials.filter((s) => s.enabled));
        }
      })
      .catch(() => {});
  }, []);

  if (!socials.length) return null;

  return (
    <div className="social-icons">
      {socials.map((s) => {
        const Icon = ICON_MAP[s.icon];
        if (!Icon || !s.url) return null;

        const href = s.url.startsWith("mailto:") ? s.url : s.url;

        return (
          <a
            key={s.platform}
            href={href}
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
