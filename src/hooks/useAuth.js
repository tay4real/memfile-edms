import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchUser } from "../services/auth.service";

import { useHistory } from "react-router-dom";

const useAuth = () => {
  const history = useHistory();
  let { user, loading, isAuth, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    if (error) {
      history.push("/");
    }
  }, [dispatch, error, history]);

  return [user, loading, isAuth];
};

export default useAuth;
