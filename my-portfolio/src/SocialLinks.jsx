// src/components/SocialLinks.jsx
import React from 'react';
// Changed the import line to get FaAdobe from fa6
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube} from 'react-icons/fa';
import './SocialLinks.css';
import { BiLogoAdobe } from 'react-icons/bi';
const socialLinks = [
  {
    icon: <FaLinkedin />,
    url: 'https://www.linkedin.com/in/your-linkedin-username',
    label: 'LinkedIn',
  },
  {
    icon: <FaGithub />,
    url: 'https://github.com/sd12354',
    label: 'GitHub',
  },
  {
    icon: <FaInstagram />,
    url: 'https://instagram.com/sameer_dhanda_',
    label: 'Instagram',
  },
  {
    icon: <FaInstagram />,
    url: 'https://www.adobe.com/creativecloud/plans.html',
    label: 'Adobe',
  },
  {
    icon: <FaYoutube />,
    url: 'https://www.youtube.com/channel/your-youtube-channel',
    label: 'YouTube',
  },
];

function SocialLinks() {
  return (
    <ul className="social-links">
      {socialLinks.map((link, index) => (
        <li key={index}>
          <a
            href={link.url}
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;