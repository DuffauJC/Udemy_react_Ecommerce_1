import React, { Fragment, useState, useEffect } from 'react';
import { Navbar } from '../../components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import UserProfileContextProvider from '../../lib/UserProfileContext'
import { CartPage } from './Cart'
import { Home } from './Home'
import { Checkout } from './Checkout'
import {Confirm} from './Confirm'
import '../../styles/App.css'
import { list } from '../../data'



const App = props => {

  const { items, saveLocalStorage } = props
  const [category, setCategory] = useState(0);
  const [isFiltering, setFiltering] = useState(false);
  const [filtered, setFiltered] = useState(false);


  const loadCategory = i => {
    setCategory(i)
  }
  const filterResult = (input) => {

    let fullList = list.flat();
    let results = fullList.filter(item => {
      const name = item.name.toLowerCase();
      const term = input.toLowerCase();
      return name.indexOf(term) > -1;
    });
    setFiltered(results)
  }

  useEffect(() => {
    saveLocalStorage(items)
  },  [saveLocalStorage,items])


  return (
    <Fragment>
      <Router>
        <UserProfileContextProvider>
          <Navbar filter={filterResult} setFiltering={setFiltering} />

          {/* {Routes} */}
          <Route exact path="/" component={() => <Home
            category={category}
            loadCategory={loadCategory}
            list={list}
            isFiltering={isFiltering}
            filtered={filtered}
          />} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/confirm" component={Confirm} />
        </UserProfileContextProvider>
      </Router>
    </Fragment>
  );
}
export default App;


