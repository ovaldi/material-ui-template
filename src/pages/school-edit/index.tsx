import useForm from "./useForm";
import useSave from "./useSave";
import React, { FC } from "react";
import Body from "containers/Body";
import InputField from "components/InputField";
import LoadingButton from "components/LoadingButton";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  makeStyles,
  Breadcrumbs,
  Typography,
  Paper,
  Grid,
  Container,
  Box,
  Button,
  Toolbar
} from "@material-ui/core";
import useEdit from "./useEdit";

const useStyles = makeStyles(theme => ({
  container: {
    width: "50%",
    margin: "0",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const SchoolEdit: FC = () => {
  const styles = useStyles();
  const params = useParams<any>();
  const history = useHistory();
  const [form, setForm] = useForm();
  const [save, loading] = useSave();

  useEdit(setForm);

  return (
    <Body>
      <Paper elevation={0}>
        <Toolbar>
          <Breadcrumbs>
            <Link to="/schools">Schools</Link>
            <Typography color="textPrimary">
              {params.id ? "Edit" : "Create"}
            </Typography>
          </Breadcrumbs>
        </Toolbar>
      </Paper>
      <Box height="16px"/>
      <Paper elevation={0}>
        <Container className={styles.container}>
          <form autoComplete="off">
            <Grid container>
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  label="Name"
                  value={form.name || ""}
                  onChange={event =>
                    setForm({
                      name: event.target.value
                    })
                  }
                />
              </Grid>
            </Grid>
            <Box height="16px" />
            <Grid container justify="flex-end">
              <Button onClick={() => history.goBack()}>Cancel</Button>
              <Box width="20px" />
              <LoadingButton
                color="primary"
                variant="contained"
                loading={loading}
                onClick={() => save(form)}
              >
                Save
              </LoadingButton>
            </Grid>
          </form>
        </Container>
      </Paper>
    </Body>
  );
};

export default SchoolEdit;
