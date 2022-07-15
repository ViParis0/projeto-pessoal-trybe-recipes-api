import React, { useContext, useEffect } from 'react';
import Header from '../component/Header';
import MyContext from '../context/myContext';

export default function Foods() {
  const {
    setGetPage,
  } = useContext(MyContext);
  useEffect(() => setGetPage('foods'), []);
  return (
    <div>
      <Header pageName="Foods" />
    </div>
  );
}
