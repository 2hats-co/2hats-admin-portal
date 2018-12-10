import React,{ Component } from 'react'
//import ReactQuill from 'react-quill';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ReplyIcon from '@material-ui/icons/Reply';
import SendIcon from '@material-ui/icons/Send';

import { withNavigation } from '../components/withNavigation';
import MailCandidatesList from '../components/Mail/MailCandidatesList';
import MailItem from '../components/Mail/MailItem';

const styles = theme => ({
    mailItems: {
        height: '100%',
        overflowY: 'scroll',
        padding: 40,
        paddingTop: 40 - 12,
        paddingBottom: 128,
        background: '#fff',
        boxShadow: '0 5px 40px 0 rgba(0,0,0,.15)',
        borderRadius: '10px 0 0 0',
    },
    replyButton: {
        position: 'fixed',
        bottom: 40,
        right: 40,
    },
    replyWrapper: {
        marginTop: 20,
    },
    replyAvatar: {
        marginRight: theme.spacing.unit * 2,
        width: 40,
        height: 40,
        backgroundColor: theme.palette.primary.main,
    },
});

const sampleData = [
    {
        from: 'Lorem Ipsum',
        timestamp: 1540167995,
        body: '<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    }, {
        from: 'Lorem Ipsum',
        timestamp: 1540147995,
        body: '<h2>Lorem Ipsum</h2> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    }, {
        from: 'Lorem Ipsum',
        timestamp: 2540137995,
        body: '<img src="https://i.kym-cdn.com/photos/images/newsfeed/001/205/102/61a.jpg" /><b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    }, {
        from: 'Lorem Ipsum',
        timestamp: 1540267995,
        body: '<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    }, {
        from: 'Lorem Ipsum',
        timestamp: 1540117995,
        body: '<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    }, {
        from: 'Lorem Ipsum',
        timestamp: 1540067995,
        body: '<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    }, {
        from: 'Lorem Ipsum',
        timestamp: 1540197995,
        body: '<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
]

class MailContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            candidateUID: '',
            showReplyComposer: false,
            editorHtml: '<b>Lorem Ipsum</b> is simply dummy text',
        };

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

        this.handleEditorChange = this.handleEditorChange.bind(this);
    }
    
    handleEditorChange(html) {
        this.setState({ editorHtml: html });
    }

    setCandidate() {
        console.log('setCandidate');
    }

    render() {
        const { classes } = this.props;

        return(
        <Grid container direction='row' style={{height: 'calc(100vh - 64px)'}}>
            <Grid item style={{width: 360}}>
                <MailCandidatesList setCandidate={this.setCandidate}
                    selectedCandidate={this.state.candidateUID}
                />
            </Grid>
            <Grid item xs className={classes.mailItems}>
                { sampleData.map((item, index) => (
                    <MailItem from={item.from} timestamp={item.timestamp} body={item.body} key={index} />
                )) }
                { this.state.showReplyComposer ?
                    <React.Fragment>
                        <Grid container className={classes.replyWrapper}>
                            <Avatar className={classes.replyAvatar}><ReplyIcon /></Avatar>
                            <Grid item xs>
                                {/* <ReactQuill
                                    value={this.state.editorHtml}
                                    onChange={this.handleEditorChange}
                                    classes={classes.editor}
                                    modules={this.editorModules}
                                    formats={this.editorFormats}
                                    style={{height:300, marginBottom:42}}
                                /> */}
                            </Grid>
                        </Grid>
                        <Button variant="extendedFab" color="primary" aria-label="Reply"
                            className={classes.replyButton}
                        > <SendIcon /> Send </Button>
                    </React.Fragment>
                :
                    <Button variant="extendedFab" color="primary" aria-label="Reply"
                        className={classes.replyButton}
                        onClick={() => { this.setState({ showReplyComposer: true }) }}
                    > <ReplyIcon /> Reply </Button>
                }
            </Grid>
        </Grid>
        );
    }
}

export default withNavigation(withStyles(styles)(MailContainer));
