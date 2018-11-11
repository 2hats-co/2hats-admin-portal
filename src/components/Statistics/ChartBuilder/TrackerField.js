import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid,FormControl,Select,MenuItem,TextField,InputLabel,Input} from '@material-ui/core';
import { TwitterPicker } from 'react-color'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
const trackerTypes = ['candidate','link','talentTeam']
const trackerNames = {
    candidate:['signup','signup-3rdParty','signup-password','signup-speedy','submission'],
    link:['DiscussionGroup'],
    talentTeam:['submissionAccepted','submissionProcessed','submissionRejected','submissionReviewed']
}
const styles = theme => ({
    root: {
    },
    formControl:{
        minWidth :80
    },
        swatch: {
          padding: '5px',
          background: '#fff',
          width:20,
          height:20,    
          borderRadius: 20,
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'relative',
          top: '-100px',
          right: '100px',
          bottom: '0px',
          left: '0px',
        },
   
});
class TrackerField extends Component {
    constructor(props) {
        super(props);
        this.state = { showColourPicker:false,colour:'#f00' }
    }
    toggleColourPicker =()=>{
        this.setState({showColourPicker:!this.state.showColourPicker})
    }
    componentDidMount(){
      const {colour,label,name,type,id} = this.props.tracker
      this.setState({colour,label,id,trackerName:name,trackerType:type})
    }
    componentDidUpdate(prevProps, prevState) {
      if(this.state!== prevState){
        const {label,trackerType,trackerName,id,colour} = this.state
        if(label&&trackerType&&trackerName)
        this.props.handleUpdate({id:id,type:trackerType,name:trackerName,label:label,colour})
      }
    }
    handleChange = (value,event) => {
        if(value.hex){
            // colour picker
            this.setState({colour:value.hex,showColourPicker:false})
        }else if(value.target.name){
          //selector and text field
          this.setState({[value.target.name]:value.target.value})
      }

      };
    render() { 
        const {classes,handleDelete} = this.props
        const{showColourPicker,colour,trackerType,id,trackerName,label} =this.state
        return (<Grid container alignItems='flex-end'>
            <IconButton aria-label="Delete" className={classes.button} onClick={()=>{handleDelete(id)}}>
          <DeleteIcon fontSize="small" />
        </IconButton>
            <div>
        <div className={ classes.swatch } style={{ background:colour}}onClick={ this.toggleColourPicker} >
          <div className={ classes.color } />
        </div>
        { showColourPicker ? <div className={ classes.popover }>
          <div className={ classes.cover } onClick={ this.toggleColourPicker }/>
          <TwitterPicker color={colour} onChange={ this.handleChange } />
        </div> : null }
      </div>
            <TextField
            autoFocus
            margin="dense"
            id="label"
            name="label"
            placeholder="label"
            value={label}
            type="text"
            onChange={this.handleChange}
          />
          <FormControl className={classes.formControl}>
                <Select
                value={trackerType}
                 onChange={this.handleChange}
                input={<Input name="trackerType" id="trackerName"/>}
              >
                <MenuItem value="">
                  <em>select a type</em>
                </MenuItem> {trackerTypes.map(x=><MenuItem value={x}>{x}</MenuItem>)}
              </Select>
            </FormControl>
            {trackerType?<FormControl className={classes.formControl}>
               <Select
                value={trackerName}
                 onChange={this.handleChange}
                input={<Input name="trackerName" id="tracker-name" />}
              >
                <MenuItem value="">
                  <em>select a name</em>
                </MenuItem> {trackerNames[trackerType].map(x=><MenuItem value={x}>{x}</MenuItem>)}
              </Select>
            </FormControl>:null}

            
        </Grid>);
    }
}
export default withStyles(styles)(TrackerField);