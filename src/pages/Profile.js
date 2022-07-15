import React from 'react';
import Footer from '../component/Footer';
import Header from '../component/Header';

export default function Profile() {
  return (
    <>
      <Header pageName="Profile" shouldSearch={ false } />
      <Footer />
    </>
  );
}
