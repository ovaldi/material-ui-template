import React, { FC, useEffect } from "react";
import {
  Link,
  Container,
  Typography,
  TextField,
  FormControl,
  makeStyles
} from "@material-ui/core";
import { IForm } from "./typing";
import useSubmit from "./useSubmit";
import useState from "hooks/useState";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import LoadingButton from "components/LoadingButton";

const useStyles = makeStyles(theme => ({
  inner: {
    margin: "0 auto",
    maxWidth: theme.spacing(50)
  },
  title: {
    marginTop: theme.spacing(30),
    marginBottom: theme.spacing(15)
  },
  button: {
    borderRadius: theme.spacing(2.5)
  }
}));

const Login: FC = () => {
  const styles = useStyles();
  const history = useHistory();
  const [submit, loading] = useSubmit();
  const auth = useSelector<any, AuthReducer>(state => state.auth);

  const [form, , setProp] = useState<IForm>({
    email: "",
    password: ""
  });

  useEffect(() => {
    auth.token && history.push("/");
  });

  return (
    <Container maxWidth="xl" component="main">
      <div className={styles.inner}>
        <Link href="/" color="textPrimary" underline="none">
          <Typography variant="h5" align="center" className={styles.title}>
            <b>DaisNotes</b>
          </Typography>
        </Link>
        <form
          onSubmit={event => {
            event.preventDefault();
            submit(form);
          }}
        >
          <TextField
            type="email"
            variant="outlined"
            autoComplete="username"
            label="Email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={event => setProp("email")(event.target.value)}
            margin="dense"
            fullWidth
            autoFocus
          />
          <TextField
            type="password"
            variant="outlined"
            autoComplete="current-password"
            label="Password"
            placeholder="Enter your password"
            value={form.password}
            onChange={event => setProp("password")(event.target.value)}
            margin="dense"
            fullWidth
          />
          <FormControl margin="dense" fullWidth>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              color="primary"
              variant="contained"
              loading={loading}
              disabled={Object.values(form).some(value => !value)}
              className={styles.button}
            >
              Login
            </LoadingButton>
          </FormControl>
        </form>
      </div>
    </Container>
  );
};

export default Login;
