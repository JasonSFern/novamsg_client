import { Fragment } from 'react';
import ReactPaginate from 'react-paginate';

import { Post } from '../../interfaces/post.interface';

import PostItem from './PostItem';
import classes from './PostList.module.css';

interface PostListProps {
  listlimit: number;
  totalpages: number;
  selectedpage: number;
  posts: Post[];
  onChangePage: (s: number, o: number) => void;
}

const PostList: React.FC<PostListProps> = ({
  listlimit,
  totalpages,
  selectedpage,
  posts,
  onChangePage,
}) => {
  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get('sort') === 'asc';

  const paginatePageChangeHandler = (data: any) => {
    console.log('onPageChange', data);
    let selected = data.selected;
    let offset = Math.ceil(selected * listlimit);

    onChangePage(selected, offset);
  };

  return (
    <Fragment>
      <ul className={classes.list}>
        {posts.map((quote) => (
          <li key={quote.id}>
            <PostItem
              key={quote.id}
              author={quote.author}
              timestamp={quote.updatedAt}
              content={quote.content}
            />
          </li>
        ))}
      </ul>
      <ReactPaginate
        className={classes.paginate}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={paginatePageChangeHandler}
        pageCount={totalpages}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        forcePage={selectedpage}
        renderOnZeroPageCount={undefined}
      />
    </Fragment>
  );
};

export default PostList;
