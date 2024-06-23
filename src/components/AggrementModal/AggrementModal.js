// AgreementModal.js
import React from "react";
import "./AgreementModal.css";

const AgreementModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="aggrementmodal">
      <div className="aggrementmodal-content">
        <div className="modal-header">
          <h2 className="aggrementh2">
            BloggerSpace Agreement and Privacy Policy
          </h2>
        </div>
        <div className="agreement-text">
          <h3 className="aggrementh3">1. Introduction</h3>
          <p>
            Welcome to BloggerSpace! This Agreement and Privacy Policy outlines
            the terms of use for our blog application and how we handle your
            personal information. By using BloggerSpace, you agree to these
            terms.
          </p>

          <h3 className="aggrementh3">2. Terms of Service</h3>
          <p>
            2.1. Account Creation: You must be at least 13 years old to create
            an account. You are responsible for maintaining the security of your
            account and password.
          </p>
          <p>
            2.2. Content: You retain ownership of the content you post. By
            posting, you grant BloggerSpace a non-exclusive license to use,
            modify, and display your content.
          </p>
          <p>
            2.3. Prohibited Content: You may not post content that is illegal,
            offensive, or violates others' rights.
          </p>

          <h3 className="aggrementh3">3. Privacy Policy</h3>
          <p>
            3.1. Information Collection: We collect information you provide,
            such as your name, email, and blog posts. We also collect usage data
            and device information.
          </p>
          <p>
            3.2. Use of Information: We use your information to provide and
            improve our services, communicate with you, and personalize your
            experience.
          </p>
          <p>
            3.3. Data Sharing: We do not sell your personal information. We may
            share data with service providers or if required by law.
          </p>

          <h3 className="aggrementh3">4. User Rights</h3>
          <p>
            4.1. Access and Control: You can access, edit, or delete your
            personal information through your account settings.
          </p>
          <p>
            4.2. Data Portability: You can request a copy of your data in a
            structured, commonly used format.
          </p>

          <h3 className="aggrementh3">5. Security</h3>
          <p>
            We implement reasonable security measures to protect your data.
            However, no method of transmission over the internet is 100% secure.
          </p>

          <h3 className="aggrementh3">6. Changes to This Policy</h3>
          <p>
            We may update this policy from time to time. We will notify you of
            any significant changes via email or through the application.
          </p>

          <h3 className="aggrementh3">7. Contact Us</h3>
          <p>
            If you have any questions about this Agreement and Privacy Policy,
            please contact us at support@companyname.com.
          </p>

          <p>Last updated: June 20, 2024</p>
        </div>
        <button onClick={onClose} className="aggrementclose">
          Close
        </button>
      </div>
    </div>
  );
};

export default AgreementModal;
