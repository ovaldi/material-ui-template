import useForm from "./useForm";
import Body from "containers/Body";
import { update } from "store/actions/ui";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import React, { FC, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Table,
  Button,
  Toolbar,
  TextField,
  IconButton,
  TablePagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Breadcrumbs,
  makeStyles,
  Typography,
} from "@material-ui/core";
import useReady from "./useReady";
import useSchools from "./useSchools";
import { EditOutlined } from "@material-ui/icons";

const kLimit = 20;
const useStyles = makeStyles(theme => ({
  menubar: {
    padding: theme.spacing(2)
  },
  breadcrumbs: {
    flex: 1
  },
}));

const UserList: FC = () => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setForm, setProp] = useForm();
  const id2name = useSchools();

  useEffect(() => {
    dispatch(update({ sidebar: "user" }));
  }, [dispatch]);

  useReady(setForm);

  return (
    <Body>
      <Box height="100%" display="flex" flexDirection="column">
        <Paper elevation={0}>
          <Toolbar>
            <Breadcrumbs className={styles.breadcrumbs}>
              <Typography color="textPrimary">Users</Typography>
            </Breadcrumbs>
          </Toolbar>
        </Paper>
        <Box height="16px" />
        <Paper elevation={0}>
          <Grid container alignItems="center">
            <Grid item xs={4} className={styles.menubar}>
              <TextField
                fullWidth
                label="Keyword"
                variant="outlined"
                value={form.keyword}
                onChange={event => setProp('keyword')(event.target.value)}
              />
            </Grid>
            <Grid item xs={4} className={styles.menubar}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => history.push(`/users?keyword=${encodeURIComponent(form.keyword)}`)}
              >Search</Button>
            </Grid>
          </Grid>
        </Paper>
        <Box height="16px" />
        <Box flex="1" overflow="auto">
          <Paper elevation={0}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>School</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form.items.map(x => (
                  <TableRow key={x.id}>
                    <TableCell>{x.id}</TableCell>
                    <TableCell>{x.name}</TableCell>
                    <TableCell>{x.role}</TableCell>
                    <TableCell>{x.email}</TableCell>
                    <TableCell>{id2name(x.school_id)}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => history.push(`/users/${x.id}/edit`)}
                      >
                        <EditOutlined />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
        {form.total > 20 && (
          <TablePagination
            style={{
              flexShrink: 0,
              backgroundColor: "#fff"
            }}
            rowsPerPageOptions={[]}
            component="div"
            count={form.total}
            rowsPerPage={kLimit}
            page={form.skip / kLimit}
            onChangePage={(_, page) => history.push(`/users?skip=${page * kLimit}`)}
          />
        )}
      </Box>
    </Body>
  );
};

export default UserList;
