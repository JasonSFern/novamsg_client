import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useAxios from '../hooks/use-axios';
import { getAllPosts } from '../lib/api';

import { PostPaginated, PostPaginateInput } from '../interfaces/post.interface';

import PostList from '../components/Posts/PostList';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
import NoPostsFound from '../components/Posts/NoPostsFound';

const AllPosts: React.FC = () => {
  const listLimit = 5;
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderData = queryParams.get('sort') ? queryParams.get('sort') : 'desc';

  const { sendRequest, status, data, error } = useAxios<
    PostPaginateInput,
    PostPaginated
  >(getAllPosts, true);

  useEffect(() => {
    if (typeof orderData === 'string')
      sendRequest({ offset: 0, limit: listLimit, order: orderData });
  }, [sendRequest, orderData]);

  useEffect(() => {
    let pageCount = data && data.count ? Math.ceil(data.count / listLimit) : 1;

    setTotalPages(pageCount);
  }, [data]);

  const changePageHandler = (page: number, offset: number) => {
    setSelectedPage(page);

    if (typeof orderData === 'string')
      sendRequest({ offset: offset, limit: listLimit, order: orderData });
  };

  const refreshPageHandler = () => {
    if (typeof orderData === 'string')
      sendRequest({ offset: 0, limit: listLimit, order: orderData });
  };

  return (
    <section>
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {error && <p className="centered gen-message">{error}</p>}
      {!error &&
        status === 'completed' &&
        (!data || data.rows.length === 0) && <NoPostsFound />}
      {status === 'completed' && data && data.rows.length > 0 && (
        <PostList
          selectedpage={selectedPage}
          listlimit={listLimit}
          totalpages={totalPages}
          posts={data?.rows}
          onChangePage={changePageHandler}
          onRefresh={refreshPageHandler}
        ></PostList>
      )}
    </section>
  );
};

export default AllPosts;
