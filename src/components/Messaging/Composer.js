import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import InputBase from '@material-ui/core/InputBase';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import ComposerActions from './ComposerActions';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 2,
        position: 'relative',
    },
    topBar: {
        position: 'absolute',
        right: 0,
        top: -36,
    },
    plainTextBox: {
        width: '100%',
        minHeight: 100,
    },
    quillEditor: {
        minHeight: 100,
        // border: `1px solid ${theme.palette.divider}`,

        '& .ql-editor': {
            minHeight: 100,
            padding: 0,
            fontFamily: theme.typography.fontFamily,
            fontSize: 16,
            '&.ql-blank::before': {
                fontStyle: 'normal',
                color: 'rgba(0,0,0,0.4)',
            },
        },
    },
});

function removeHtmlTags(text) {
    const htmlTags = /(<([^>]+)>)/ig;
    return text.replace(htmlTags, '');
}

function Composer(props) {
    const { classes, theme, composerType } = props;

    const [messageText, setMessageText] = useState('');
    const [messageHtml, setMessageHtml] = useState('');

    return (
    <div className={classes.root}
        style={{backgroundColor: composerType === 'note' ? theme.palette.primary.light : theme.palette.background.paper}}
    >
        { composerType === 'email' ?
            <ReactQuill
                autoFocus
                placeholder="Type your email here…"
                value={messageHtml}
                onChange={val => { setMessageHtml(val); setMessageText(removeHtmlTags(val)) }}
                theme="bubble"
                className={classes.quillEditor}
                preserveWhiteSpace
            />
            :
            <InputBase
                autoFocus
                value={messageText}
                onChange={e => { setMessageText(e.target.value); setMessageHtml(e.target.value)  }}
                style={{ width: '100%', padding: 0, }}
                inputProps={{
                    className: classes.plainTextBox
                }}
                multiline
                placeholder={`Type your ${ composerType === 'linkedin' ? 'message' : 'note' } here…`}
            />
        }

        <ComposerActions
            classes={classes}
            composerType={composerType}
        />

    </div>
    );
}

export default withStyles(styles, { withTheme: true })(Composer);
