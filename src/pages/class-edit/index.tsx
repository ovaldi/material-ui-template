import useForm from "./useForm";
import useData from "./useData";
import useEdit from "./useEdit";
import useSave from "./useSave";
import React, { FC, useEffect } from "react";
import Body from "../../containers/Body";
import { update } from "store/actions/ui";
import { useDispatch } from "react-redux";
import Select from "../../components/Select";
import InputField from "../../components/InputField";
import LoadingButton from "../../components/LoadingButton";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  makeStyles,
  MenuItem,
  Toolbar,
  Breadcrumbs,
  Typography,
  Paper,
  Grid,
  Container,
  Box,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    width: "50%",
    margin: "0",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const ClassEdit: FC = () => {
  const styles = useStyles();
  const params = useParams<any>();
  const schools = useData();
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setForm, setProp] = useForm();
  const [save, loading] = useSave();

  useEdit(setForm);

  useEffect(() => {
    dispatch(update({ sidebar: "class" }));
  }, [dispatch]);

  return (
    <Body>
      <Paper elevation={0}>
        <Toolbar>
          <Breadcrumbs>
            <Link to="/classes">Classes</Link>
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  label="Name"
                  value={form.name || ""}
                  onChange={event => setProp("name")(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  label="Level"
                  value={form.level || ""}
                  onChange={event => setProp("level")(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  label="Program"
                  value={form.program || ""}
                  onChange={event => setProp("program")(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  type="number"
                  label="Section"
                  value={form.section}
                  InputProps={{
                    inputProps: {
                      min: 1,
                      max: 9
                    }
                  }}
                  onChange={event => {
                    const value = parseInt(event.target.value);
                    setProp("section")(isNaN(value) ? "" : value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  label="School"
                  value={form.school_id}
                  onChange={event => setProp("school_id")(event.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {schools.map(x => (
                    <MenuItem key={x.id} value={x.id}>
                      {x.name}
                    </MenuItem>
                  ))}
                </Select>
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

export default ClassEdit;
