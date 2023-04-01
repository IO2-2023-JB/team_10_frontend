import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { GetUserDetailsResponse, UserDetails, userDetailsState } from '../data/UserData';
import { LoginFormValues } from '../pages/Login/LoginForm';
import { RegisterFormValues } from '../pages/Register/RegisterForm';

const userKey = 'user';

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
  return useMutation<null, AxiosError, RegisterFormValues>({
    mutationFn: (body) => axios.post('register', body),
    onSuccess: () => {
      navigate('/login', { state: { successfulRegister: true } });
    },
  });
}

export function useUserDetails(id: string) {
  return useQuery<GetUserDetailsResponse, AxiosError>({
    queryKey: [userKey, id],
    queryFn: async () => (await axios.get(`user/${id}`)).data,
  });
}

export function useLoggedInUserDetails(): {
  isLoading: boolean;
  error: string | null;
  reload: () => void;
  logOut: () => void;
} {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(
    localStorage.getItem('bearerToken') !== null && userDetails === null
  );

  const getLoggedInUserDetails = useCallback(async () => {
    const token = localStorage.getItem('bearerToken');
    try {
      const { data } = await axios.get('user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails({ ...data, token });
    } catch (error) {
      setError((error as AxiosError).message);
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
    localStorage.removeItem('bearerToken');
  };

  return { isLoading, error, reload, logOut };
}