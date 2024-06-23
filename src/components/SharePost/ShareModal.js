import React, { useState } from "react";
import "./ShareModal.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  RedditShareButton,
  RedditIcon,
  PinterestShareButton,
  PinterestIcon,
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import { FaCopy } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ShareModal({ isOpen, onClose, postUrl, postTitle }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
    ],
  };

  if (!isOpen) return null;

  return (
    <div className="sharemodal-overlay">
      <div className="sharemodal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Share this post</h2>
        <div className="copy-link">
          <input type="text" value={postUrl} readOnly />
          <button onClick={copyToClipboard}>
            {copied ? "Copied!" : <FaCopy />}
          </button>
        </div>
        <Slider {...sliderSettings}>
          <div>
            <FacebookShareButton url={postUrl} quote={postTitle}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>
          <div>
            <TwitterShareButton url={postUrl} title={postTitle}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
          <div>
            <LinkedinShareButton url={postUrl} title={postTitle}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
          <div>
            <WhatsappShareButton url={postUrl} title={postTitle}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
          <div>
            <TelegramShareButton url={postUrl} title={postTitle}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>
          <div>
            <RedditShareButton url={postUrl} title={postTitle}>
              <RedditIcon size={32} round />
            </RedditShareButton>
          </div>
          <div>
            <PinterestShareButton url={postUrl} title={postTitle}>
              <PinterestIcon size={32} round />
            </PinterestShareButton>
          </div>
          <div>
            <EmailShareButton url={postUrl} title={postTitle}>
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>

          {/* Add more share buttons as needed */}
        </Slider>
      </div>
    </div>
  );
}

export default ShareModal;
