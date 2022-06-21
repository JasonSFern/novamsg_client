import { useEffect, useState } from 'react';

import useAxios from '../hooks/use-axios';
import { PostPaginated, PostPaginateInput } from '../interfaces/post.interface';
import { getAllPosts } from '../lib/api';

import PostList from '../components/Posts/PostList';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
import NoPostsFound from '../components/Posts/NoPostsFound';

const AllPosts: React.FC = () => {
  const listLimit = 5;
  const [selectedPage, setSelectedPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const orderData = 'desc';
  console.log(orderData);

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
    console.log('page: ' + page);
    console.log('offset: ' + offset);
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
      {error && <p className="centered focused">{error}</p>}
      {status === 'completed' && (!data || data.rows.length === 0) && (
        <NoPostsFound />
      )}
      {status === 'completed' && data && data.rows.length > 0 && (
        <PostList
          selectedpage={selectedPage}
          listlimit={listLimit}
          totalpages={totalPages}
          posts={data?.rows}
          onChangePage={changePageHandler}
        ></PostList>
      )}
    </section>
  );
};

export default AllPosts;
