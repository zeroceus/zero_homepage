import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined';
import {BlogContent} from '../../utils/blogContent';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: 'white',
        borderRadius: 10,
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    subTitle: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: theme.spacing(2)
    },
    drafted_state: {
        border: 1,
        borderStyle: 'solid',
        borderColor: '#ff3d00',
        borderRadius: theme.spacing(1),
        color: '#ff3d00',
        paddingInline: theme.spacing(1)
    },
    submitted_state: {
        border: 1,
        borderStyle: 'solid',
        borderColor: '#00e676',
        borderRadius: theme.spacing(1),
        color: '#00e676',
        paddingInline: theme.spacing(1)
    },
    time: {
        fontStyle: 'italic',
    }
  }));

export default function Show(props) {
    const blog = props.blog;
    const classes = useStyles();

    const state = blog.state == 'drafted' ? classes.drafted_state : classes.submitted_state;
    
    return (
        <Container className={classes.content}>
            <Typography variant="h3" gutterBottom>
                {blog.title}
            </Typography>
            <Grid
                className={classes.subTitle}
                border={1}
                container>
                <Grid item container xs={2} alignItems='center'>
                    <ClassOutlinedIcon /><Typography variant="subtitle1" color="textSecondary" >{blog.category_name}</Typography>
                </Grid>
                <Grid item className={state}>
                    <Typography variant="subtitle1" color="inherit">{blog.state}</Typography>
                </Grid>
                
                <Grid item xs>
                    <Typography className={classes.time} variant="subtitle1" align="right" color="textSecondary" >{blog.created_at}</Typography>
                </Grid>
            </Grid>
            <Divider/>
            {BlogContent(blog.content)}
        </Container>
    );
}