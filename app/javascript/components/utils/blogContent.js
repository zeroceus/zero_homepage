import React from 'react';
import parse from 'html-react-parser';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: '#F2F3F4',
        borderRadius: theme.spacing(1),
        opacity: 0.8,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2)
    }
}));

export const BlogContent = (content) => {
    const classes = useStyles();
    return (<Box className={classes.content}>{parse(content)}</Box>);
}