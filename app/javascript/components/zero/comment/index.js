import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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


const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: 'white',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
}));

export default function Index(props) {
  const classes = useStyles();
  const [comments, setComments] = useState(props.comments);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    const baseURI = `${zero_host}/comments`;
    let page = newPage + 1;

    request().get(`${baseURI}.json?page=${page}`).then(res => {
      console.log(res.data);
      setComments(res.data.comments);
      setPage(newPage);
    })
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const show = (comment_id, event) => {
    event.preventDefault();
    const baseURI = `${zero_host}/comments/${comment_id}/`;
    // jump(baseURI);
  }

  const CommentItem = (comment) => {

    return (
      <TableRow key={comment.id}>
        <TableCell component="th" scope="row">
          {comment.id}
        </TableCell>
        <TableCell size="small" align="right">{comment.content}</TableCell>
        <TableCell size="small" align="right">{comment.created_at}</TableCell>
        <TableCell size="medium" align="right">
          <Button size="small" color="primary" onClick={(e) => show(comment.id, e)}>
            Show
          </Button>
          {/* <Button size="small" color="primary" onClick={(e) => openDestroyDialog(comment.id)}>
            Delete
          </Button> */}
        </TableCell>
      </TableRow>
      )
}

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>   
        <Typography component="h2" variant="h6" color="primary">  {props.title} </Typography>
      </Box>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell size="small" align="right">Content</TableCell>
            <TableCell size="small" align="right">CreateAt</TableCell>
            <TableCell size="medium" align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.length > 0 ? (comments.map((comment) => (CommentItem(comment)))
          ): (<TableRow><TableCell size="medium" align="left">NO COMMENTS YET</TableCell></TableRow>)}
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
    </Container>
  );
}