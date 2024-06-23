import React, { useState } from "react";
import Lottie from "react-lottie-player";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import animationData from "../../assets/contactme.json";

const Contact = () => {
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: "",
    type: "",
  });

  // Shows alert message for form submission feedback
  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });

    // Hide alert after 5 seconds
    setTimeout(() => {
      setAlertInfo({ display: false, message: "", type: "" });
    }, 5000);
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (e) => {
    e.preventDefault();

    // Destructure data object
    const { name, email, subject, message } = e.target.elements;

    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
      };

      // Use emailjs to email contact form data
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_PUBLIC_KEY
      );

      // Display success alert
      toggleAlert("Form submission was successful!", "success");
    } catch (e) {
      console.error(e);
      console.log(process.env.REACT_APP_SERVICE_ID);
      console.log(process.env.REACT_APP_TEMPLATE_ID);
      console.log(process.env.REACT_APP_PUBLIC_KEY);

      // Display error alert
      toggleAlert("Uh oh. Something went wrong.", "danger");
    } finally {
      // Re-enable form submission
      setDisabled(false);
      // Reset contact form fields after submission
      e.target.reset();
    }
  };

  return (
    <div className="contact-container">
      <Lottie
        loop
        animationData={animationData}
        play
        className="lottieanimation"
      />
      <div className="contact-me">
        <h1 style={{ marginTop: "20px", fontWeight: "800", color: "black" }}>
          Get In Touch
        </h1>
        <p style={{ marginTop: "20px", fontWeight: "800", color: "black" }}>
          If you have any questions or just want to say hello, feel free to
          contact me!
        </p>
        <div className="contact-info">
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <a href="mailto:youremail@example.com" style={{ color: "black" }}>
              youremail@example.com
            </a>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <a href="tel:+1234567890" style={{ color: "black" }}>
              +1 234 567 890
            </a>
          </div>
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <span style={{ color: "black" }}>Your City, Your Country</span>
          </div>
        </div>
        {alertInfo.display && (
          <div
            className={`alert alert-${alertInfo.type} alert-dismissible mt-5`}
            role="alert"
          >
            {alertInfo.message}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() =>
                setAlertInfo({ display: false, message: "", type: "" })
              } // Clear the alert when close button is clicked
            ></button>
          </div>
        )}
        <form className="contact-form" onSubmit={onSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <input type="text" name="subject" placeholder="Subject" required />
          <textarea
            name="message"
            placeholder="Your Message"
            required
          ></textarea>
          <button type="submit" disabled={disabled}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
