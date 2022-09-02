import React, { useState, useEffect } from "react";
// import './mcFormStyles.scss';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import SubHeading from "../SubHeading/SubHeading";
import "./Newsletter.css";

const CustomForm = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (status === "success") clearField();
  }, [status]);

  const clearField = () => {
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    email && email.indexOf("@") > -1 && onValidated({ EMAIL: email });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="app__newsletter">
        <div className="app__newsletter-heading">
          <SubHeading title="Newsletter" />
          <h1 className="heading headtext__cormorant">
            Subscribe To Our Newsletter
          </h1>
          <p className="p__opensans">And never miss latest Updates!</p>
        </div>
        <div className="app__subscription">
          <h3>
            {status === "success"
              ? "Success!"
              : "Join our email list for future updates"}
          </h3>
          {status === "sending" && <h3>sending...</h3>}
          {status === "error" && (
            <div
              className="message"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
          {status === "success" && (
            <div
              className="message"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
        </div>
        <div className="app__newsletter-input flex__center">
          <input
            type="email"
            placeholder="Enter your E-mail Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="custom__button" type="submit" value={email}>
            Subscribe
          </button>
        </div>
      </div>
    </form>
  );
};

const MailchimpForm = (props) => {
  const postUrl = `https://gmail.us9.list-manage.com/subscribe/post?u=${process.env.REACT_APP_U}&id=${process.env.REACT_APP_ID}`;

  return (
    <div className="mc__form-container">
      <MailchimpSubscribe
        url={postUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </div>
  );
};

export default MailchimpForm;
