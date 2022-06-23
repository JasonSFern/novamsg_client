import { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { Post } from '../../interfaces/post.interface';

import Button from '../UI/Button/Button';

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
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isSortingAscending = queryParams.get('sort') === 'asc';

  const changeSortingHandler = () => {
    navigate({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? 'desc' : 'asc'}`,
    });
  };

  const paginatePageChangeHandler = (data: { selected: number }) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * listlimit);

    onChangePage(selected, offset);
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <Button
          title="Sort Order"
          displaystyle="button_std"
          onClick={changeSortingHandler}
        >
          Sort {isSortingAscending ? 'Decending' : 'Ascending'}
        </Button>
      </div>
      <ul className={classes.list}>
        {posts.map((quote) => (
          <li key={quote.id}>
            <PostItem
              key={quote.id}
              author={quote.author}
              timestamp={quote.updatedAt}
              content={quote.content}
              comments={quote.comments}
              likes={quote.post_likes}
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
