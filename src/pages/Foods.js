import React from 'react';
import Header from '../component/Header';
import SearchBar from '../component/SearchBar';

export default function Foods() {
  return (
    <div>
      <Header pageName="Foods" />
      <SearchBar />
    </div>
  );
}
