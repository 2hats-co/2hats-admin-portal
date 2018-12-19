import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import InputBase from '@material-ui/core/InputBase';
import Chip from '@material-ui/core/Chip';

import FileIcon from '@material-ui/icons/Attachment';
import EventIcon from '@material-ui/icons/EventOutlined';
import ReminderIcon from '@material-ui/icons/NotificationsOutlined';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import ComposerActions from './ComposerActions';
import {removeHtmlTags} from '../../../utilities';
import {sendEmail} from '../../../utilities/email/gmail'
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
    chipWrapper: {
        marginLeft: -theme.spacing.unit,
    },
    chipIcon: {
        marginLeft: theme.spacing.unit,
    },
});

const DUMMY_EVENTS = [
    { type: 'reminder', label: '12/12/2018 3:48 pm' },
    { type: 'file', label: 'resume.pdf', link: 'google.com' },
    { type: 'event', label: 'Meeting at 12/12/2018 3:48 pm' },
];

const getChipIcon = (type) => {
    switch (type) {
        case 'reminder': return <ReminderIcon />;
        case 'file':     return <FileIcon />;
        case 'event':    return <EventIcon />;
        default: return null;
    }
}

function Composer(props) {
    const { classes, theme, conversation, composerType } = props;
    console.log('conversation',conversation)
    const [messageText, setMessageText] = useState('');
    const [messageHtml, setMessageHtml] = useState('');
    const [attachments, setAttachments] = useState(DUMMY_EVENTS);
    const handleSendEmail = ()=>{
        const email = {subject:'test',body:messageHtml}
        const recipient = {email:'shams.mosowi@gmail.com'}
        const sender = {email:'shams@2hats.com.au'}
        sendEmail(conversation.id,{recipient,email,sender})
        console.log('sending email',messageHtml)
    }
    const handleAddNote = ()=>{
        console.log('adding note',messageText)

    }
    const handleSendLinkedin = ()=>{
        console.log('sending linkedin',messageText)
    }
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

        <div className={classes.chipWrapper}>
            { attachments.map((x, i) => 
                <Chip
                    key={i}
                    label={x.label}
                    icon={getChipIcon(x.type)}
                    onDelete={() => {
                        const newAttachments = attachments;
                        newAttachments.splice(i, 1);
                        setAttachments(newAttachments);
                    }}
                    classes={{ icon: classes.chipIcon }}
                />
            ) }
        </div>

        <ComposerActions
            actions = {{email:handleSendEmail,note:handleAddNote,linkedin:handleSendLinkedin}}
            classes={classes}
            composerType={composerType}
        />

    </div>
    );
}

export default withStyles(styles, { withTheme: true })(Composer);
