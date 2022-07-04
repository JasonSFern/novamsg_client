import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form/Form';
import useAxios from '../hooks/use-axios';
import { createContent } from '../lib/api';

import {
  ContentInput,
  ContentOutput,
  ContentPayload,
  ContentType,
} from '../interfaces/content.interface';

const NewPost: React.FC = () => {
  const { sendRequest, status, error } = useAxios<ContentInput, ContentOutput>(
    createContent
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (status == 'completed') {
      if (!error) navigate('/posts', { replace: true });
    }
  }, [status, navigate]);

  const addHandler = (type: ContentType, postData: ContentPayload) => {
    const obj = {
      type: type,
      payload: postData,
    };
    sendRequest(obj);
  };

  return (
    <Fragment>
      {error && <p className="centered gen-message">{error}</p>}
      <Form
        isLoading={status === 'pending'}
        onAdd={addHandler}
        type="post"
      ></Form>
    </Fragment>
  );
};

export default NewPost;
