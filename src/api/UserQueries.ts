import axios, { AxiosError } from 'axios';
import { RegisterFormValues } from '../pages/Register/RegisterForm';
import { LoginFormValues } from '../pages/Login/LoginForm';
import { LoginRequestResponse } from '../data/UserData';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  // userDetailsFetch hook
  return useMutation<LoginRequestResponse, AxiosError, LoginFormValues>({
    mutationFn: (body) => axios.post('login', body).then((res) => res.data),
    onSuccess: (res) => {
      navigate('/');
      // fetch userDetails
      //setUserDetails(res.token);
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();
  return useMutation<null, AxiosError, RegisterFormValues>({
    mutationFn: (body) => axios.post('register', body).then((res) => res.data),
    onSuccess: (res) => {
      navigate('/login', { state: { successfulRegister: true } });
    },
  });
}

// export const register = (body: RegisterFormValues) =>
//   axios.post('register', body).then((res) => res);
