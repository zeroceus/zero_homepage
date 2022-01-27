import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {host, jump, request} from '../utils/request.js';
import ClassOutlinedIcon from '@material-ui/icons/ClassOutlined';
import Divider from '@material-ui/core/Divider';
import Pagination from '@material-ui/lab/Pagination';
import SideBar from './side';
import Blog from './show';

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
  box: {
    paddingTop: theme.spacing(6),
    marginLeft: theme.spacing(24),
    paddingRight: theme.spacing(12),
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'row',
  },
  pagination: {
    alignSelf: 'center',
    marginTop: theme.spacing(4),
  },
  blogBox: {
    width: theme.spacing(80),
    marginRight: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
      height: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      opacity: 0.8,
      boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      '&:hover' : {
        opacity: 1,
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
        cursor: 'pointer'
      }
  },
  cardContent: {
      flexGrow: 1,
  },
  subTitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  time: {
      fontStyle: 'italic',
  },
}));

export default function Index(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [blogs, setBlogs] = React.useState(props.blogs);
  const [totalPage, setTotalPage] = React.useState(props.params.page_count);
  const [blog, setBlog] = React.useState(props.blog);

  const handleChangePage = (event, page) => {
    event.preventDefault();
    const currentUrl = new URL(window.location.href);
    let url = '';

    if(currentUrl.search) {
      url = `${currentUrl.origin}${currentUrl.pathname}.json${currentUrl.search}&page=${page}`;
    }else {
      url = `${currentUrl.href}.json?page=${page}`;
    }

    request().get(url).then(res => {
      setBlogs(res.data.blogs);
      setPage(page);
      setTotalPage(res.data.params.page_count);
    })
  };

  const showBlog = (event, blog_id) => {
    event.preventDefault();
    const location = `${host}/blogs/${blog_id}`;
    const url = `${host}/blogs/${blog_id}.json`;
    request().get(url).then(res => {
      history.pushState('', '', location);
      setBlog(res.data);
    });
  }

  const clearBlog = (event) => {
    event.preventDefault();
    history.pushState('', '', document.referrer);
    setBlog(null);
  }

  const BlogCard = (props) => {
    const classes = useStyles();
    const blog = props.blog;
    
    return (
      <Grid item xs={12}>
        <Card className={classes.card}
              onClick={(e) => {showBlog(e, blog.id)}}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h4">
              {blog.title}
            </Typography>
          </CardContent>
          <Grid
                className={classes.subTitle}
                border={1}
                container>
                <Grid item container xs={2} alignItems='center'>
                  <ClassOutlinedIcon /><Typography variant="subtitle1" color="textSecondary" >{blog.category_name}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography className={classes.time} variant="subtitle1" align="right" color="textSecondary" >{blog.date}</Typography>
                </Grid>
            </Grid>
        </Card>
      </Grid>
    );
  }

  return (
    <Box
        component="main"
        className={classes.box}
      >
        {
          blog ? (<Blog blog={blog} clearBlog={clearBlog}/>) : 
          (
            <Box className={classes.blogBox}>
              <Box className={classes.title}>   
                  <Typography variant="h3">  {props.title} </Typography>
              </Box>
              <Divider variant="middle" />
              <Grid container spacing={4}>
                {
                  blogs.length > 0 ? (blogs.map((blog) => (<BlogCard key={blog.id} blog={blog}/>))) : 
                  (<Grid item xs={12}><Typography component="h2" variant="h6" color="secondary">  NO BLOGS YET </Typography></Grid>)
                }
                </Grid>
                {
                  totalPage > 1 ? (
                    <Box className={classes.pagination}>  
                    <Pagination count={totalPage}
                                page={page}
                                variant="outlined"
                                color="secondary"
                                size="large"
                                onChange={handleChangePage} />
                                </Box>) : null
                }
            </Box>
          )
        }
        <SideBar
          categories={props.categories}
          params={props.params}
          setBlog={setBlog}
          setBlogs={setBlogs}
          setTotalPage={setTotalPage}
          setPage={setPage}/>
      </Box>
  );
}