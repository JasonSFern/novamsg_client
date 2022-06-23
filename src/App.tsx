import React, { Suspense } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';

const ProtectedRoute = React.lazy(
  () => import('./components/Layout/ProtectedRoute')
);

const AllPosts = React.lazy(() => import('./pages/AllPosts'));
const UserPosts = React.lazy(() => import('./pages/UserPosts'));
const NewPost = React.lazy(() => import('./pages/NewPost'));
const AccessDenied = React.lazy(() => import('./pages/AccessDenied'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  const fallback = () => {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  };

  return (
    <Layout>
      <Suspense fallback={fallback}>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/user-posts" element={<ProtectedRoute />}>
            <Route index element={<UserPosts />} />
          </Route>
          <Route path="/new-post" element={<ProtectedRoute />}>
            <Route index element={<NewPost />} />
          </Route>
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
