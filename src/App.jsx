import './App.css'
import Navbar from './components/Navbar/navbar'
import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Author from "./pages/Author/Author";
import Publisher from "./pages/Publisher/Publisher";
import Book from "./pages/Book/Book";
import BorrowBook from "./pages/BorrowBook/BorrowBook";
import Category from "./pages/Category/Category";

function App() {


  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/authors">
          <Author />
        </Route>
        <Route path="/publishers">
          <Publisher />
        </Route>  
        <Route path="/books">
          <Book />
        </Route>
        <Route path="/borrow">
          <BorrowBook />
        </Route>
        <Route path="/categories">
          <Category />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>  
    </>
  )
}

export default App
