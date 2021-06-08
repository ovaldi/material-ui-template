import { useCallback} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "store/actions/auth";

const useLogout = (): () => void => {
  const history = useHistory();
  const dispatch = useDispatch();
  return useCallback(
    () => {
      dispatch(logout());
      history.push('/login');
    },
    [history, dispatch],
  );
};

export default useLogout;
