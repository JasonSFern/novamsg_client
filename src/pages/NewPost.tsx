import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form/Form';
import useAxios from '../hooks/use-axios';
import { createContent } from '../lib/api';

import {
  ContentInput,
  ContentOutput,
  ContentType,
} from '../interfaces/content.interface';

const NewPost = () => {
  const { sendRequest, status } = useAxios<ContentInput, ContentOutput>(
    createContent
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (status == 'completed') {
      navigate('/posts');
    }
  }, [status, navigate]);

  const addHandler = (
    type: ContentType,
    postData: { user_id: number; content: string }
  ) => {
    const obj = {
      type: type,
      payload: postData,
    };
    sendRequest(obj);
  };

  return (
    <Form
      isLoading={status === 'pending'}
      onAdd={addHandler}
      type="post"
    ></Form>
  );
};

export default NewPost;
