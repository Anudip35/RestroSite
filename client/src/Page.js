import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../src/components/Auth/Auth";
import Book from "../src/components/Book/Book";
import App from "./App";

const Page = () => {
  // const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/login" exact element={<Auth />} />
        <Route path="/book" exact element={<Book />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
