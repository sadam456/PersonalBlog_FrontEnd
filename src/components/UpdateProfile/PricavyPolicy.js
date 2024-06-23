import React from "react";
import "./PrivacyPolicy.css";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <h6 className="ppdate">Effective Date: [06-18-2024]</h6>

      <h2>1. Introduction</h2>
      <p>
        Welcome to [Personal Blog] ("we", "our", "us"). We are committed to
        protecting your privacy and ensuring that your personal information is
        handled in a safe and responsible manner. This Privacy Policy explains
        how we collect, use, disclose, and protect your information when you use
        our web application ("App").
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        We collect various types of information in connection with the services
        we provide, including:
      </p>
      <h3>a. Personal Information:</h3>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Contact information</li>
        <li>Payment information (if applicable)</li>
      </ul>

      <h3>b. Non-Personal Information:</h3>
      <ul>
        <li>Browser type</li>
        <li>Operating system</li>
        <li>IP address</li>
        <li>Device type</li>
        <li>Usage data (e.g., pages visited, time spent on the App)</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>
        We use the information we collect for various purposes, including to:
      </p>
      <ul>
        <li>Provide, operate, and maintain our App</li>
        <li>Improve, personalize, and expand our App</li>
        <li>Understand and analyze how you use our App</li>
        <li>Develop new products, services, features, and functionalities</li>
        <li>
          Communicate with you, either directly or through one of our partners,
          including for customer service, to provide you with updates and other
          information relating to the App, and for marketing and promotional
          purposes
        </li>
        <li>Process your transactions and manage your orders</li>
        <li>Send you emails</li>
        <li>Find and prevent fraud</li>
      </ul>

      <h2>4. Sharing Your Information</h2>
      <p>
        We may share your information with third parties under the following
        circumstances:
      </p>
      <ul>
        <li>
          With service providers and vendors to perform functions and provide
          services to us
        </li>
        <li>To comply with legal obligations</li>
        <li>To protect and defend our rights and property</li>
        <li>With your consent or at your direction</li>
      </ul>

      <h2>5. Security of Your Information</h2>
      <p>
        We use administrative, technical, and physical security measures to help
        protect your personal information. While we have taken reasonable steps
        to secure the personal information you provide to us, please be aware
        that despite our efforts, no security measures are perfect or
        impenetrable, and no method of data transmission can be guaranteed
        against any interception or other types of misuse.
      </p>

      <h2>6. Your Data Protection Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access, update, or delete the information we have on you</li>
        <li>Object to the processing of your data</li>
        <li>Request the restriction of processing your data</li>
        <li>Request the transfer of your data</li>
        <li>
          Withdraw your consent at any time where we relied on your consent to
          process your personal information
        </li>
      </ul>

      <h2>7. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page. You are
        advised to review this Privacy Policy periodically for any changes.
        Changes to this Privacy Policy are effective when they are posted on
        this page.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at: <Link to="/contact">Click Here</Link>
      </p>
    </div>
  );
}

export default PrivacyPolicy;
