import useData from "./useData";
import Body from "containers/Body";
import useRemove from "./useRemove";
import useAlert from "hooks/useAlert";
import { useDispatch } from "react-redux";
import { update } from "store/actions/ui";
import { useHistory } from "react-router";
import React, { FC, useEffect } from "react";
import {
  AddCircleOutlineOutlined,
  EditOutlined,
  DeleteOutlined
} from "@material-ui/icons";
import {
  Box,
  Paper,
  Table,
  Toolbar,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Breadcrumbs,
  Typography,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  breadcrumbs: {
    flex: 1,
  },
}));

const SchoolList: FC = () => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [alert, close] = useAlert();
  const [schools, setSchools] = useData();
  const [remove] = useRemove(setSchools);

  useEffect(() => {
    close();
    dispatch(update({ sidebar: "school" }));
  }, [close, dispatch]);

  return (
    <Body>
      <Paper elevation={0}>
        <Toolbar>
          <Breadcrumbs className={styles.breadcrumbs}>
            <Typography color="textPrimary">Schools</Typography>
          </Breadcrumbs>
          <IconButton
            color="primary"
            onClick={() => history.push("/schools/new")}
          >
            <AddCircleOutlineOutlined />
          </IconButton>
        </Toolbar>  
      </Paper>
      <Box height="16px"/>
      <Paper elevation={0}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schools.map(x => (
              <TableRow key={x.id}>
                <TableCell>{x.id}</TableCell>
                <TableCell>{x.name}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => history.push(`/schools/${x.id}/edit`)}
                  >
                    <EditOutlined />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      alert({
                        title: "Delete",
                        message: "Are you sure you want to delete school?",
                        actions: [
                          {
                            text: "Cancel"
                          },
                          {
                            text: "Delete",
                            style: "primary",
                            onPress: () => remove(x.id)
                          }
                        ]
                      });
                    }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Body>
  );
};

export default SchoolList;
