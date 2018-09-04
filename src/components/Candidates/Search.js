import React, { Component } from 'react';
import { InstantSearch, Hits,SearchBox, Pagination} from 'react-instantsearch-dom';
import CandidateRow from './CandidateRow'
import { withStyles } from '@material-ui/core';
const styles =  theme => ({
  'ais-Hits-list':{
    backgroundColor:'#f00'
  }
})
function Search() {
  return (
    <div className="container">
     <SearchBox/>
      <Hits hitComponent={CandidateRow} style={{width:'100%',listStyleType: 'none'}}/>
      <Pagination/>
    </div>
  );
}
export default withStyles(styles)(Search)