
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getUserInfo } from "../reducer/authSlice";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { user, loading, isFetched } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getUserInfo());
    }
  }, [dispatch, isFetched]);

  if (loading || !isFetched) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
