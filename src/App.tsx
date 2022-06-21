import React from 'react';

import Layout from './components/Layout/Layout';

const AllPosts = React.lazy(() => import('./pages/AllPosts'));

function App() {
  return (
    <Layout>
      <AllPosts />
    </Layout>
  );
}

export default App;
