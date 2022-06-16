import { useCallback, useReducer } from 'react';
import { AxiosError } from 'axios';

interface AxiosState<T> {
  data?: T | null;
  error?: string | null;
  status?: string | null;
}

type AxiosAction<T> =
  | { type: 'PENDING' }
  | { type: 'SUCCESS'; responseData: T }
  | { type: 'FAIL'; errorMessage: string };

const createAxiosReducer =
  <T>() =>
  (state: AxiosState<T>, action: AxiosAction<T>): AxiosState<T> => {
    if (action.type === 'PENDING') {
      return {
        data: null,
        error: null,
        status: 'pending',
      };
    }

    if (action.type === 'SUCCESS') {
      return {
        data: action.responseData,
        error: null,
        status: 'completed',
      };
    }

    if (action.type === 'FAIL') {
      return {
        data: null,
        error: action.errorMessage,
        status: 'completed',
      };
    }

    return state;
  };

const useAxios = <T, I>(
  requestFunction: (payload: T) => Promise<I>,
  startWithPending: boolean = false
) => {
  const axiosReducer = createAxiosReducer<I>();
  const [axiosState, dispatch] = useReducer(axiosReducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async (params: T) => {
      dispatch({ type: 'PENDING' });
      try {
        const responseData = await requestFunction(params);

        dispatch({ type: 'SUCCESS', responseData });
      } catch (e: AxiosError | any) {
        const error = e.response;

        dispatch({
          type: 'FAIL',
          errorMessage: error.data || 'Something went wrong!',
        });
      }
    },
    [requestFunction]
  );

  return { sendRequest, ...axiosState };
};

export default useAxios;
