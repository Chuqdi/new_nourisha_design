import { BACKEND_URL } from '@/config';
import axios from 'axios';
import {useAtomValue} from 'jotai';
import {useQuery} from 'react-query';
import useAuthToken from './useAuthToken';

const useFetch = (getData:()=> void, key: string|number|string[], enabled:boolean) => {
  const { getToken } = useAuthToken();
 
  const {isLoading, isError, data, refetch, isRefetching,} = useQuery([key], getData, {
    enabled,
  });
  return {
    isLoading,
    isError,
    data,
    refetch,
    isRefetching,
  };
};

export default useFetch;
