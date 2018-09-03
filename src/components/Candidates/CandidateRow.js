import React from 'react'
import {Highlight} from 'react-instantsearch-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function CandidateRow({ hit }) {
    //return <div>{hit.firstName} {hit.lastName}</div>;

    return(
      <TableRow
                      hover
                      onClick={()=>{console.log(hit.objectID)}}
                      tabIndex={-1}
                      key={hit.objectID}
                    >
                      <TableCell component="th" //scope="row" padding="none"
                      >
                        {hit.firstName} {hit.lastName}
                      </TableCell>
                      <TableCell component="th" //scope="row" padding="none"
                      >
                        {hit.stage}
                      </TableCell>
                      <TableCell component="th" //scope="row" padding="none"
                      >
                        {hit.status}
                      </TableCell>
                      
                    </TableRow>
    )
//    return (
//     <div style={{ marginTop: '10px' }}>
//       <span className="hit-name">
//         <Highlight attribute="name" hit={hit} />
//       </span>
//     </div>
//   );
  }
export default CandidateRow