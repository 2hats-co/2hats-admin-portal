import React from 'react';

import orange from '@material-ui/core/colors/orange';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    card: {
        maxWidth: 340,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      actions: {
        display: 'flex',
      },
      expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
          marginRight: -8,
        },
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },
    });
function NoteItem(props) {
    const {operator,body,createdAt} = props
    return(<Card className={classes.card}>
     <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              H
            </Avatar>
          }
          title="added by Herman"
          subheader="September 14, 2016"
        />
       <CardContent>
       <Typography paragraph>
        hmmm not super sure of this guy, has potential!great people skills!
            </Typography>
       </CardContent>
    </Card>)
}
export default withStyles(styles)(NoteItem);