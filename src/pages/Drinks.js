import React, { useContext, useEffect } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import MyContext from '../context/myContext';

export default function Drinks() {
  const {
    setGetPage,
  } = useContext(MyContext);
  useEffect(() => setGetPage('drinks'), []);
  return (
    <>
      <Header pageName="Drinks" />
      <h1>Drinks</h1>
      <Footer />
    </>
  );
}
