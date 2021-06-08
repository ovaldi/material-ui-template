import useForm from "./useForm";
import Body from "containers/Body";
import useRemove from "./useRemove";
import DeleteButton from "./delete-button";
import { update } from "store/actions/ui";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import React, { FC, useEffect } from "react";
import { AddCircleOutlineOutlined, EditOutlined } from "@material-ui/icons";
import {
  Paper,
  Select,
  MenuItem,
  FormControl,
  TablePagination,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Breadcrumbs,
  makeStyles,
  Typography,
  Grid,
  Box,
  Toolbar
} from "@material-ui/core";
import useSchools from "./useSchools";
import useQuery from "hooks/useQuery";
import useReady from "./useReady";

const kLimit = 20;
const useStyles = makeStyles(theme => ({
  menubar: {
    padding: theme.spacing(2)
  },
  breadcrumbs: {
    flex: 1
  }
}));

const ClassList: FC = () => {
  const query = useQuery();
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setForm] = useForm();
  const [remove] = useRemove(setForm);

  useEffect(() => {
    dispatch(update({ sidebar: "class" }));
  }, [dispatch]);

  useReady(setForm);
  useSchools(setForm);

  return (
    <Body>
      <Box height="100%" display="flex" flexDirection="column">
        <Paper elevation={0}>
          <Toolbar>
            <Breadcrumbs className={styles.breadcrumbs}>
              <Typography color="textPrimary">Classes</Typography>
            </Breadcrumbs>
            <IconButton
              color="primary"
              onClick={() => history.push("/classes/new")}
            >
              <AddCircleOutlineOutlined />
            </IconButton>
          </Toolbar>
        </Paper>
        <Box height="16px" />
        <Paper elevation={0}>
          <Grid item xs={4} className={styles.menubar}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>School</InputLabel>
              <Select
                value={query.school_id || ""}
                labelWidth={60}
                onChange={event =>
                  history.push(`/classes?school_id=${event.target.value}`)
                }
              >
                {form.schools.map(x => (
                  <MenuItem key={x.id} value={x.id}>
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                  <TableCell>Level</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {form.classes.map(x => (
                  <TableRow key={x.id}>
                    <TableCell>{x.id}</TableCell>
                    <TableCell>{x.name}</TableCell>
                    <TableCell>{x.level}</TableCell>
                    <TableCell>{x.program}</TableCell>
                    <TableCell>{x.section}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => history.push(`/classes/${x.id}/edit`)}
                      >
                        <EditOutlined />
                      </IconButton>
                      <DeleteButton onClick={() => remove(x.id)} />
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
            onChangePage={(x, page) => {
              history.push(
                `/classes?school_id=${query.school_id}&skip=${page * kLimit}`
              );
            }}
          />
        )}
      </Box>
    </Body>
  );
};

export default ClassList;
