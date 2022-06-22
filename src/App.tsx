import React, { Suspense } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';

const AllPosts = React.lazy(() => import('./pages/AllPosts'));
const NewPost = React.lazy(() => import('./pages/NewPost'));

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
          <Route path="/new-post" element={<NewPost />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
