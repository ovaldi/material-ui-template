import useForm from "./useForm";
import useEdit from "./useEdit";
import useSave from "./useSave";
import useSchools from "./useSchools";
import React, { FC, useEffect } from "react";
import Body from "../../containers/Body";
import { update } from "store/actions/ui";
import { useDispatch } from "react-redux";
import Select from "../../components/Select";
import DatePicker from "../../components/DatePicker";
import InputField from "../../components/InputField";
import LoadingButton from "../../components/LoadingButton";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Toolbar,
  MenuItem,
  makeStyles,
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

const UserEdit: FC = () => {
  const styles = useStyles();
  const params = useParams<any>();
  const schools = useSchools();
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
            <Link to="/users">Users</Link>
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
                  label="Email"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={form.email}
                />
              </Grid>
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
                  label="Bio"
                  value={form.bio || ""}
                  onChange={event => setProp("bio")(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  fullWidth
                  label="Birthday"
                  placeholder="Select Date"
                  value={form.birthday || null}
                  onChange={date => setProp('birthday')(date ? date.toISOString() : null)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  label="Major"
                  value={form.major || ""}
                  onChange={event => setProp("major")(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  label="Avatar"
                  value={form.avatar || ""}
                  onChange={event => setProp("avatar")(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  label="Role"
                  value={form.role}
                  onChange={event => setProp("role")(event.target.value)}
                >
                  <MenuItem value='user'>User</MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Select
                  label="Gender"
                  value={form.gender}
                  onChange={event => setProp("gender")(event.target.value)}
                >
                  <MenuItem value={0}>Unknown</MenuItem>
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                </Select>
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
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  label="TikTok"
                  value={form.tiktok || ""}
                  onChange={event => setProp("tiktok")(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  label="Twitter"
                  value={form.twitter || ""}
                  onChange={event => setProp("twitter")(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  label="Snapchat"
                  value={form.snapchat || ""}
                  onChange={event => setProp("snapchat")(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  label="Facebook"
                  value={form.facebook || ""}
                  onChange={event => setProp("facebook")(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  label="LinkedIn"
                  value={form.linkedin || ""}
                  onChange={event => setProp("linkedin")(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  fullWidth
                  label="Instagram"
                  value={form.instagram || ""}
                  onChange={event => setProp("instagram")(event.target.value)}
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

export default UserEdit;
