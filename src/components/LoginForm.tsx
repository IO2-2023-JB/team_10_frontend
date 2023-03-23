import { Box } from '@mui/system';
import { CssBaseline, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/LoginOutlined';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {
  ValidatePassword,
  ValidateLettersAndNumbers,
} from '../utilities/ValidationUtilities';
import { UserData, LoggedFlag } from '../data/UserData';

interface LoginFormProps {}

function LoginForm({}: LoginFormProps) {
  const [userLogged, setUserLogged] = useRecoilState(UserData);
  const [logged, setLogged] = useRecoilState(LoggedFlag);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  return (
    <Box>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant='h5' mb={3} style={{ fontWeight: 3 }} color='error'>
          {errorMessage}
        </Typography>
        <LoginIcon sx={{ marginBottom: '20px', height: '60px', width: '60px' }} />
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoFocus
            value={userName}
            onChange={(x) => setUserName(x.target.value)}
            error={!ValidateLettersAndNumbers(userName)}
            helperText={
              !ValidateLettersAndNumbers(userName) && 'Only letters and numbers allowed'
            }
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(x) => setPassword(x.target.value)}
            error={!ValidatePassword(password)}
            helperText={
              !ValidatePassword(password) &&
              'Password too weak (must be at least 8-character long and contain one lower case letter, one upper case letter, one number and one special character)'
            }
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid spacing={1} container></Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
