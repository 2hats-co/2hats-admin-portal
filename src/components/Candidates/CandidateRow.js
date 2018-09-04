import React from 'react'
import {Highlight} from 'react-instantsearch-dom';

import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import EmailIcon from '@material-ui/icons/MailOutline'
import PhoneIcon from '@material-ui/icons/Phone'

function CandidateRow({ hit }) {
    //return <div>{hit.firstName} {hit.lastName}</div>;

    return(
      <Grid container direction='row' style={{width:'100%'}} alignItems='center'>
      <Grid item xs={2}>
      {hit.firstName} {hit.lastName}
      </Grid>
      <Grid item xs={2} style={{display:'flex'}}>
      
      </Grid>
      <Grid item xs={2}>
        {hit.stage}
      </Grid>
      <Grid item xs={2}>
        {hit.status}
      </Grid>
      <Grid item>
        {hit.staff}
      </Grid>
      <Grid item>
        {hit.careerInterests&& hit.careerInterests.map(x=>` ${x},`)}
      </Grid>
      <Grid item>
        {hit.note}
      </Grid>
      <Grid item>
        {hit.insdustry}
      </Grid>
      <Grid item>
        {hit.ACScore}
      </Grid>
      </Grid>
      // <TableRow
      //                 hover
      //                 onClick={()=>{console.log(hit.objectID)}}
      //                 tabIndex={-1}
      //                 key={hit.objectID}
      //               >
      //                 <TableCell component="th" //scope="row" padding="none"
      //                 >
                        
      //                 </TableCell>
      //                 <TableCell component="th" //scope="row" padding="none"
      //                 >
      //                   {hit.stage}
      //                 </TableCell>
      //                 <TableCell component="th" //scope="row" padding="none"
      //                 >
      //                   {hit.status}
      //                 </TableCell>
                      
      //               </TableRow>
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