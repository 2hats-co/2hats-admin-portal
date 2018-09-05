import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import EmailIcon from '@material-ui/icons/MailOutline'
import PhoneIcon from '@material-ui/icons/Phone'
import moment from 'moment'
import TableRow from '@material-ui/core/TableRow';
import ClipBoardIcon from '../../ClipBoardIcon'
function _bolding(s){
    return <div dangerouslySetInnerHTML={{ __html:s.replace('<em>','<b>').replace('</em>','</b>')}} />
  }

function _getTimePassed(timestamp){
    return moment.unix(timestamp)
    .fromNow()
    .replace('months','M')
    .replace('minutes','m')
    .replace('ago','')
    .replace('days','d')
    .replace('hours','h')
    .replace('a hour', '1 h')
    .replace('a day', '1 d')
    .replace('a day', '1 d')
    .replace('a minute', '1 m')
  }
function _getInterests(interests){
    let interestsString = ''
    if(interests){
        if(interests.length === 0){
       
        }else if(interests.length === 1){
            interestsString = interests[0].value
        }else{
            interests.forEach(x=>{
                if(interestsString === ''){
                    interestsString = interests[0].value
                }else{
                    interestsString += ', ' + x.value
                }
            })
        }
    }
    return _bolding(interestsString)
}
function CandidateRow(props){
    const {candidateData,changeHandler} = props
    const {_highlightResult} = candidateData
    const {firstName,lastName,stage,status,careerInterests,staff,industry,note,score} = _highlightResult
    const name = _bolding(`${firstName.value} ${lastName.value}`) 
    const email = (candidateData.email&&{value:candidateData.email,isHighlighted:(_highlightResult.email.matchedWords&&_highlightResult.email.matchedWords.length !==0)})
    const phoneNumber = (candidateData.phoneNumber&&{value:candidateData.phoneNumber,isHighlighted:(_highlightResult.phoneNumber.matchedWords&&_highlightResult.phoneNumber.matchedWords.length !==0)})
    
    return(<TableRow hover onClick={() =>{changeHandler('selectedCandidate',candidateData)}}>
       <TableCell>
                  {_getTimePassed(candidateData.createdAt)}
        </TableCell>
        <TableCell>
        {name}
        </TableCell>
        <TableCell>        
                       {email &&<ClipBoardIcon value={email.value} isHighlighted={email.isHighlighted}>
                            <EmailIcon/>
                          </ClipBoardIcon>
                        }
                        {phoneNumber &&<ClipBoardIcon value={phoneNumber.value} isHighlighted={phoneNumber.isHighlighted}>
                            <PhoneIcon/>
                          </ClipBoardIcon>
                        }
                       </TableCell>

        <TableCell>{_bolding(stage.value)}</TableCell>
        <TableCell>{_bolding(status.value)}</TableCell>
        <TableCell>{staff&&_bolding(staff.value)}</TableCell>
        <TableCell>{_getInterests(careerInterests)}</TableCell>
        <TableCell>{note&&_bolding(note.value)}</TableCell>
        <TableCell>{industry&&_bolding(industry.value)}</TableCell>
        <TableCell>{score&&_bolding(score.value)}</TableCell>
    </TableRow>
        // <TableRow
        //               hover
        //              // onClick={event => this.handleClick(event, n)}
        //               tabIndex={-1}
        //               key={n.id}
        //             > 
        //             <TableCell>
        //               {_getTimePassed(n.updatedAt)}
        //             </TableCell>
        //               <TableCell component="th" scope="row">
        //               <div dangerouslySetInnerHTML={{ __html:n.name }} />
        //               </TableCell>
        //               <TableCell>        
        //               {n.email &&
        //                   <Tooltip title={n.email}>
        //                   <IconButton onClick={()=>{copyToClipboard(n.email)}}>
        //                     <EmailIcon/>
        //                   </IconButton>
        //               </Tooltip>
        //                 }
        //               {n.phoneNumber && <Tooltip title={n.phoneNumber}> 
        //                     <IconButton onClick={()=>{copyToClipboard(n.phoneNumber)}}>
        //                       <PhoneIcon/>
        //                     </IconButton>
        //                 </Tooltip>} 
        //               </TableCell>
        //               <TableCell >{n.stage}</TableCell>
        //               <TableCell >{n.status}</TableCell>
        //               <TableCell >{n.staff}</TableCell>
        //               <TableCell >{n.interests}</TableCell>
        //               <TableCell >{n.flags}</TableCell>
        //               <TableCell >{n.note}</TableCell>
        //               <TableCell >{n.industry}</TableCell>
        //               <TableCell >{n.score}</TableCell>
        //             </TableRow>
    )
}
export default CandidateRow