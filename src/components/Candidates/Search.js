import React, { Component } from 'react';
import { InstantSearch, Hits,SearchBox, Pagination} from 'react-instantsearch-dom';
import CandidateRow from './CandidateRow'
function Search() {
  return (
    <div className="container">
     <SearchBox />
      <Hits hitComponent={CandidateRow}/>
      <Pagination/>
    </div>
  );
}
export default Search