import axios, { AxiosError } from 'axios';
import { RegisterFormValues } from '../pages/Register/RegisterForm';
import { LoginFormValues } from '../pages/Login/LoginForm';
import { userDetailsState, UserDetails, GetUserDetailsResponse } from '../data/UserData';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

const userKey = 'user';

export function useLogin() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
  let postResponse: string;

  useEffect(() => {
    if (userDetails !== null) navigate('/');
  }, [userDetails, navigate]);

  return useMutation<UserDetails, AxiosError, LoginFormValues>({
    mutationFn: (body) =>
      axios.post('login', body).then(async (res) => {
        postResponse = res.data.token;
        return {
          ...(
            await axios.get('user', {
              headers: { Authorization: `Bearer ${postResponse}` },
            })
          ).data,
          token: postResponse,
        };
      }),
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
