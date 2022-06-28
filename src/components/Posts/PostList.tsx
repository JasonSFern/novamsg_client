import { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { Post } from '../../interfaces/post.interface';

import Button from '../UI/Button/Button';
import { FaCaretLeft } from 'react-icons/fa';
import { FaCaretRight } from 'react-icons/fa';

import PostItem from './PostItem';
import classes from './PostList.module.css';

interface PostListProps {
  listlimit: number;
  totalpages: number;
  selectedpage: number;
  posts: Post[];
  onChangePage: (s: number, o: number) => void;
  onRefresh: () => void;
}

const PostList: React.FC<PostListProps> = ({
  listlimit,
  totalpages,
  selectedpage,
  posts,
  onChangePage,
  onRefresh,
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
        {posts.map((post) => (
          <li key={post.id}>
            <PostItem
              key={post.id}
              id={post.id}
              author={post.author}
              timestamp={post.updatedAt}
              edited={post.createdAt !== post.updatedAt}
              content={post.content}
              comments={post.comments}
              refreshlist={onRefresh}
              show_comment_btn={true}
            />
          </li>
        ))}
      </ul>
      <ReactPaginate
        className={classes.paginate}
        breakLabel="..."
        nextLabel={<FaCaretRight />}
        previousLabel={<FaCaretLeft />}
        onPageChange={paginatePageChangeHandler}
        pageCount={totalpages}
        pageRangeDisplayed={4}
        marginPagesDisplayed={4}
        forcePage={selectedpage}
        renderOnZeroPageCount={undefined}
        breakLinkClassName={classes.pagelink}
        pageLinkClassName={classes.pagelink}
        previousLinkClassName={classes.pagelinknav}
        nextLinkClassName={classes.pagelinknav}
        breakClassName={classes.pageitem}
        pageClassName={classes.pageitem}
        previousClassName={classes.pageitem}
        nextClassName={classes.pageitem}
        activeClassName={classes.paginate_active}
      />
    </Fragment>
  );
};

export default PostList;
