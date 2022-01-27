import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { green } from '@material-ui/core/colors';
import {zero_host, jump, request} from '../../utils/request.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import DialogBox from '../../utils/DialogBox';

const useStyles = makeStyles((theme) => ({
  box: {
      backgroundColor: 'white',
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
  },
}));

export default function Blogs(props) {
  const classes = useStyles();
  const [blogs, setBlogs] = React.useState(props.blogs);
  const [dialog, setDialog] = React.useState({
    open: false,
    title: '',
    description: '',
    handleConfirm: null,
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    const baseURI = `${zero_host}/blogs`;
    let page = newPage + 1;

    request().get(`${baseURI}.json?page=${page}`).then(res => {
      console.log(res.data);
      setBlogs(res.data.blogs);
      setPage(newPage);
    })
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const add = (event) => {
    event.preventDefault();
    const baseURI = `${zero_host}/blogs/new`;
    jump(baseURI);
  }
  
  const edit = (blog_id, event) => {
    event.preventDefault();
    const baseURI = `${zero_host}/blogs/${blog_id}/edit`;
    jump(baseURI);
  }
  
  const show = (blog_id, event) => {
    event.preventDefault();
    const baseURI = `${zero_host}/blogs/${blog_id}/`;
    jump(baseURI);
  }
  
  const openSubmitDialog = (blog_id) => {
    setDialog({
      open: true,
      title: 'Submit this blog',
      description: 'Are you sure to submit this blog?',
      handleConfirm: (e) => handleSubmit(blog_id, e)
    })
  }

  const openDestroyDialog = (blog_id) => {
    setDialog({
      open: true,
      title: 'Delete this blog',
      description: 'Are you sure to delete this blog?',
      handleConfirm: (e) => handleDestroy(blog_id, e)
    })
  }

  const handleSubmit = (blog_id, event) => {
    event.preventDefault();
    const baseURI = `${zero_host}/blogs/${blog_id}/submit`;
    let body = {format: 'json'};
    
    request().post(baseURI, body).then(res => {
      handleClose();
      updateBlog(res.data.blog);
    }).catch(err => {
      console.log(err);
    })
  }
  
  const handleDestroy = (blog_id, event) => {
    event.preventDefault();
    const baseURI = `${zero_host}/blogs/${blog_id}.json`;

    request().delete(baseURI).then(res => {
      handleClose();
      removeBlog(blog_id);
    }).catch(err => {
      console.log(err);
    })
  }
  
  
  const handleClose = () => {
    setDialog({open: false});
  }
  
  const updateBlog = (blog) => {
    setBlogs((prevBlogs) => {
      let blogs = [];
      for(var i = 0; i < prevBlogs.length; i++) {
        if(prevBlogs[i].id === blog.id) {
          blogs.push(blog);
        }else {
          blogs.push(prevBlogs[i]);
        }
      }
      return blogs;
    });
    
  }
  
  const removeBlog = (blog_id) => {
    setBlogs((prevBlogs) => {
      let blogs = [];
      for(var i = 0; i < prevBlogs.length; i++) {
        if(prevBlogs[i].id !== blog_id) {
          blogs.push(prevBlogs[i]);
        }
      }
      return blogs;
    });
  }
  
  const BlogItem = (blog) => {

      return (
        <TableRow key={blog.id}>
          <TableCell component="th" scope="row">
            {blog.title}
          </TableCell>
          <TableCell size="small" align="right">{blog.state}</TableCell>
          <TableCell size="small" align="right">{blog.created_at}</TableCell>
          <TableCell size="medium" align="right">
            <Button size="small" color="primary" onClick={(e) => show(blog.id, e)}>
              Show
            </Button>
            <Button size="small" color="primary" onClick={(e) => edit(blog.id, e)}>
              Edit
            </Button>
            <Button size="small" color="primary" onClick={(e) => openSubmitDialog(blog.id)}>
              Submit
            </Button>
            <Button size="small" color="primary" onClick={(e) => openDestroyDialog(blog.id)}>
              Delete
            </Button>
          </TableCell>
        </TableRow>
        )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>   
        <Typography component="h2" variant="h6" color="primary">  {props.title} </Typography>
        <IconButton aria-label="new" className={classes.margin} onClick={add}>
          <AddIcon style={{ color: green[500] }} fontSize="large"/>
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell size="small" align="right">State</TableCell>
            <TableCell size="small" align="right">CreateAt</TableCell>
            <TableCell size="medium" align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.length > 0 ? (blogs.map((blog) => (BlogItem(blog)))
          ): (<TableRow><TableCell xs size="medium" align="left">NO BLOGS YET</TableCell></TableRow>)}
        </TableBody>
        <TableFooter>
          <TableRow>
          <TablePagination
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    <DialogBox open={dialog.open}
               title={dialog.title}
               description={dialog.description}
               handleClose={handleClose}
               handleConfirm={dialog.handleConfirm}/>
    </Container>
  );
}