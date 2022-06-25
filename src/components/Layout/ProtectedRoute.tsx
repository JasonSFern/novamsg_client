import { useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserSession } from '../../interfaces/user.interface';

import { userAuthenticated } from '../../lib/api';
import useAxios from '../../hooks/use-axios';

import AuthContext from '../../context/auth-context';

// @ts-ignore
const ProtectedRoute: React.FC = ({ children }) => {
  const authCtx = useContext(AuthContext);

  const { sendRequest, status, data, error } = useAxios<string, UserSession>(
    userAuthenticated
  );

  useEffect(() => {
    if (authCtx.token) sendRequest(authCtx.token);
  }, [sendRequest]);

  if (error) {
    return <Navigate to="/access-denied" replace />;
  }

  if (authCtx.token) {
    if (status == 'completed' && data) {
      if (data.auth) {
        authCtx.renewSession(data.session);

        return (
          <>
            {children}
            <Outlet />
          </>
        );
      }

      if (!data.auth) {
        authCtx.logout();

        return <Navigate to="/posts" replace />;
      }
    }
  } else {
    return <Navigate to="/posts" replace />;
  }
};

export default ProtectedRoute;
