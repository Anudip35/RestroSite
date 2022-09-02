import React, { useState } from "react";
import "antd/dist/antd.css";
import { TimePicker } from "antd";
import moment from "moment";
import "./Book.css";
import { useNavigate } from "react-router-dom";
import "../../../node_modules/antd/dist/antd.css";

function Book() {
  const navigate = useNavigate();

  const date = new Date();
  date.setDate(date.getDate());
  const defaultValue = date.toLocaleDateString("en-CA");

  const format = "HH:mm";

  const [book, setBook] = useState("");
  const [click, setClick] = useState(false);
  console.log(book);

  function handleClick() {
    setClick(true);
  }

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={navigateToHome} className="closeBtn">
            {" "}
            Home{" "}
          </button>
        </div>
        <div className="title">
          <h1>Gericht Restaurant</h1>
        </div>
        {click ? (
          <div className="changedDisplay">
            <h2>
              Your Table is Booked for {book.toLocaleDateString()},
              {book.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h2>
          </div>
        ) : (
          <div className="body">
            <label htmlFor="book">Choose a time to Reserve your Table: </label>
            <input
              type="date"
              className="inputfield"
              defaultValue={defaultValue}
            />
            <div className="timepicker">
              <TimePicker
                defaultValue={moment("18:00", format)}
                format={format}
                className="time"
                popupStyle={{ fontSize: 25 }}
                bordered
                minuteStep={15}
                onChange={(value) => setBook(value._d)}
              />
            </div>
            <button
              type="submit"
              className="custom__button"
              onClick={handleClick}
            >
              Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Book;

// const date = new Date();

//   const defaultValue = moment(date).format("YYYY-MM-DDThh:mm");

//   var enteredDate = new Date();
//   var date_booked =
//     enteredDate.getDate() +
//     "-" +
//     (enteredDate.getMonth() + 1) +
//     "-" +
//     enteredDate.getFullYear();
//   var time_booked = enteredDate.getHours() + ":" + enteredDate.getMinutes();
//   if (enteredDate.getHours() > 12) {
//     time_booked += " PM,";
//   } else {
//     time_booked += "AM,";
//   }
//   var datetime = time_booked + "\n" + date_booked;

// const [times] = useState([
//   "7PM",
//   "8PM",
//   "9PM",
//   "10PM",
//   "11PM",
//   "12AM",
//   "1AM",
//   "2AM",
//   "3AM",
// ]);
