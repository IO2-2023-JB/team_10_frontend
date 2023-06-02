import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDetailsState } from '../data/UserData';
import { LoginFormValues } from '../data/formData/user';
import { PostUserDetails, PutUserDetails, UserDetails } from '../types/UserTypes';
import { GetUserDetailsResponse } from './../types/UserTypes';

export const userKey = 'user';

export function useLogin() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  useEffect(() => {
    if (userDetails !== null) navigate('/');
  }, [userDetails, navigate]);

  return useMutation<UserDetails, AxiosError, LoginFormValues>({
    mutationFn: async (body) => {
      const { data: loginData } = await axios.post('login', body);
      const { data: userData } = await axios.get('user', {
        headers: { Authorization: `Bearer ${loginData.token}` },
      });
      return {
        ...userData,
        token: loginData.token,
      };
    },
    onSuccess: (res) => {
      setUserDetails({ ...res });
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();
  return useMutation<null, AxiosError, PostUserDetails>({
    mutationFn: (body) => axios.post('register', body),
    onSuccess: () => {
      navigate('/login', { state: { successfulRegister: true } });
    },
  });
}

export function useUserDetails(id?: string) {
  return useQuery<GetUserDetailsResponse, AxiosError>({
    queryKey: [userKey, id],
    queryFn: async () => (await axios.get('user', { params: { id } })).data,
    enabled: id !== undefined,
  });
}

export function useLoggedInUserDetails(): {
  isLoading: boolean;
  error: AxiosError | null;
  reload: () => void;
  logOut: () => void;
  showLoading: boolean;
} {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  const [error, setError] = useState<AxiosError | null>(null);

  const shouldLoadUser =
    localStorage.getItem('bearerToken') !== null && userDetails === null;

  const [isLoading, setIsLoading] = useState<boolean>(shouldLoadUser);

  const getLoggedInUserDetails = useCallback(async () => {
    const token = localStorage.getItem('bearerToken');
    try {
      const { data } = await axios.get('user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails({ ...data, token });
    } catch (error) {
      setError(error as AxiosError);
      setIsLoading(false);
    }
  }, [setUserDetails]);

  useEffect(() => {
    if (userDetails !== null) setIsLoading(false);
  }, [userDetails]);

  useEffect(() => {
    if (isLoading) getLoggedInUserDetails();
  }, [isLoading, getLoggedInUserDetails]);

  const reload = () => {
    setError(null);
    setIsLoading(true);
  };

  const logOut = () => {
    setError(null);
    setUserDetails(null);
  };

  return { isLoading, error: error, reload, logOut, showLoading: shouldLoadUser };
}

export function useUserDetailsEdit() {
  const userDetails = useRecoilValue(userDetailsState);
  const queryClient = useQueryClient();
  return useMutation<UserDetails, AxiosError, PutUserDetails>({
    mutationFn: async (body) => {
      return await (
        await axios.put(`user?id=${userDetails?.id}`, body)
      ).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userDetails?.id] });
    },
  });
}
