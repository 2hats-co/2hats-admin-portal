import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

import SendIcon from '@material-ui/icons/Send';
import DoneIcon from '@material-ui/icons/Done';
import AtIcon from '@material-ui/icons/AlternateEmail';
import EmojiIcon from '@material-ui/icons/InsertEmoticon';
import GifIcon from '@material-ui/icons/Gif';
import AttachmentIcon from '@material-ui/icons/Attachment';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import CalendarIcon from '@material-ui/icons/EventOutlined';
import ReminderIcon from '@material-ui/icons/NotificationsOutlined';

import CalendarDialog from './CalendarDialog';

const emojiButton =      (handleClick) => <Tooltip title="Emoji" key="emoji"><IconButton onClick={handleClick}><EmojiIcon /></IconButton></Tooltip>
const gifButton =        (handleClick) => <Tooltip title="GIF" key="gif"><IconButton onClick={handleClick} style={{padding:6}}><GifIcon style={{fontSize:36}} /></IconButton></Tooltip>
const imageButton =      (handleClick) => <Tooltip title="Image" key="image"><IconButton onClick={handleClick}><ImageIcon /></IconButton></Tooltip>
const attachmentButton = (handleClick) => <Tooltip title="Attachment" key="attachment"><IconButton onClick={handleClick}><AttachmentIcon /></IconButton></Tooltip>
const calendarButton =   (handleClick) => <Tooltip title="Calendar Event" key="calendar"><IconButton onClick={handleClick}><CalendarIcon /></IconButton></Tooltip>
const reminderButton =   (handleClick) => <Tooltip title="Reminder" key="reminder"><IconButton onClick={handleClick}><ReminderIcon /></IconButton></Tooltip>
const atButton =         (handleClick) => <Tooltip title="At" key="at"><IconButton onClick={handleClick}><AtIcon /></IconButton></Tooltip>

const ComposerActions = React.memo((props) => {
    const { composerType } = props;

    const [showCalendarDialog, setShowCalendarDialog] = useState(false);

    let fabContent;
    switch (composerType) {
        case 'email':
            fabContent = <React.Fragment><SendIcon />Send email</React.Fragment>;
            break;
        case 'linkedin':
            fabContent = <React.Fragment><SendIcon />Send message</React.Fragment>;
            break;
        case 'note':
            fabContent = <React.Fragment><DoneIcon />Save note</React.Fragment>;
            break;
        default:
            fabContent = null;
            break;
    }

    let actionButtons;
    switch (composerType) {
        case 'email':
            actionButtons = [
                emojiButton(),
                imageButton(),
                gifButton(),
                attachmentButton(),
                calendarButton(() => { setShowCalendarDialog(true) }),
            ];
            break;
        case 'linkedin':
            actionButtons = [emojiButton()];
            break;
        case 'note':
            actionButtons = [
                emojiButton(),
                imageButton(),
                gifButton(),
                attachmentButton(),
                reminderButton(),
                atButton(),
            ];
            break;
        default: break;
    }

    return (<React.Fragment>
        <Grid item>
            <Grid container justify="space-between">
                <Grid item>
                    { actionButtons }
                </Grid>
                <Grid item>
                    <Fab variant="extended" color="primary"> { fabContent } </Fab>
                </Grid>
            </Grid>
        </Grid>

        <CalendarDialog showCalendarDialog={showCalendarDialog} setShowCalendarDialog={setShowCalendarDialog} />

    </React.Fragment>);
});

export default (ComposerActions);
