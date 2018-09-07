import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import CloseIcon from '@material-ui/icons/Close';
import DownloadIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachmentIcon from '@material-ui/icons/Attachment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';

import ReactQuill from 'react-quill';

import DownshiftMultiple from './DownshiftMultiple';

const styles = theme => ({
    root: {
        height: '100%',
        paddingTop: 56,
        position: 'relative',
    },
    gridItem: {
        margin: '10px 20px',
    },
    editor: {
        height:400,
        marginBottom:17
    }
});

class EmailComposer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            editorHtml: '',
        }

        this.editorModules = {
            toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                {'indent': '-1'}, {'indent': '+1'}]
            ],
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            }
        };

        this.editorFormats = [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video'
        ];

        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    handleSubjectChange(e) {
        this.setState({ subject: e.target.value });
    }

    handleEditorChange(html) {
        this.setState({ editorHtml: html });
    }

    render() {
        const { classes } = this.props;

        return(
            <Grid container direction="column" className={classes.root}>
                <AppBar position="absolute" color="#fff">
                    <Grid container justify="space-between" alignItems="center">
                        <Tooltip title="Close">
                            <IconButton onClick={this.props.closeComposer}><CloseIcon /></IconButton>
                        </Tooltip>
                        <Grid item xs>
                            <Typography variant="subheading">{this.props.reply ? 'Reply' : 'New email'}</Typography>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Delete"><IconButton><DeleteIcon /></IconButton></Tooltip>
                            <Tooltip title="Add attachment"><IconButton><AttachmentIcon /></IconButton></Tooltip>
                            <Tooltip title="Schedule"><IconButton><AccessTimeIcon /></IconButton></Tooltip>
                            <Tooltip title="Save"><IconButton><SaveIcon /></IconButton></Tooltip>
                            <Tooltip title="Send"><IconButton color="primary"><SendIcon /></IconButton></Tooltip>
                        </Grid>
                    </Grid>
                </AppBar>
                <Grid item class={classes.gridItem}> <DownshiftMultiple /> </Grid>
                <Grid item class={classes.gridItem}>
                    <TextField
                        id="subject"
                        label="Subject"
                        value={this.state.subject}
                        onChange={this.handleSubjectChange}
                        style={{width:'100%'}}
                    />
                </Grid>
                <Grid item class={classes.gridItem}>
                    <Chip
                        key={2}
                        avatar={<Avatar><DownloadIcon /></Avatar>}
                        label="test.pdf"
                        onDelete={()=>null}
                        className={classes.chip}
                    />
                </Grid>
                <Grid item class={classes.gridItem}>
                    <ReactQuill
                        value={this.state.editorHtml}
                        onChange={this.handleEditorChange}
                        classes={classes.editor}
                        modules={this.editorModules}
                        formats={this.editorFormats}
                        theme="snow"
                        style={{height:200}}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(EmailComposer);
