import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined';
import {BlogContent} from '../utils/blogContent';
import Divider from '@material-ui/core/Divider';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CommentForm from './comment_form';

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '2.5rem',
        marginBottom: theme.spacing(3),
        paddingBottom: theme.spacing(4),
        borderBottom: '1px solid ',
    },  
    blogBox: {
        width: theme.spacing(80),
        marginRight: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column',
    },
    subTitle: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: theme.spacing(2)
    },
    time: {
        fontStyle: 'italic',
    },
    backButton: {
        transition: '0.1s',
        '&:hover' : {
            cursor: 'pointer',
            fontSize: theme.spacing(6),
        }
    }
  }));

export default function Blog(props) {
    const {blog, clearBlog} = props;
    const classes = useStyles();

    return (
        <Box className={classes.blogBox}>
            <Box className={classes.title}>   
                <Typography variant="h3">  {blog.title} </Typography>
                <ArrowBackIcon className={classes.backButton} fontSize="large" onClick={clearBlog}/>
            </Box>
            
            <Grid
                className={classes.subTitle}
                border={1}
                container>
                <Grid item container xs={2} alignItems='center'>
                    <ClassOutlinedIcon /><Typography variant="subtitle1" color="textSecondary" >{blog.category_name}</Typography>
                </Grid>
                
                <Grid item xs>
                    <Typography className={classes.time} variant="subtitle1" align="right" color="textSecondary" >{blog.created_at}</Typography>
                </Grid>
            </Grid>
            <Divider variant="middle" />
            {BlogContent(blog.content)}
            {/*{ TODO: Comment module
                blog.comments && blog.comments.length > 0 ? (<Typography>COMMENTS</Typography>) : (<Typography>NO COMMENTS YET</Typography>)
            }
            {
                props.current_user ? (<CommentForm blogId={blog.id}/>) : (<Typography>LOGIN FIRST!</Typography>)
            }*/}
        </Box>
    );
}