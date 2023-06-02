import {
  Alert,
  Button,
  List,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import PageLayout from '../../components/layout/PageLayout';
import { DEFAULT_BACKEND_URL, ROUTES } from '../../const';
import { backendUrlState } from '../../data/UrlData';
import { userDetailsState } from '../../data/UserData';
import OptionWrapper from './OptionWrapper';

interface BackendOptionData {
  name: string;
  url: string;
}

const backendOptions: BackendOptionData[] = [
  { name: 'Domyślny', url: DEFAULT_BACKEND_URL },
  { name: 'Zespół 10', url: 'https://mojewidelo.pl/api' },
  { name: 'Zespół 11', url: 'https://wetubeback.azurewebsites.net/api' },
  { name: 'Zespół 12', url: 'https://videoserviceapi.azurewebsites.net/api' },
  { name: 'Zespół 13', url: 'https://io2.azurewebsites.net/api/' },
];

const customOptionIndex = -1;

function SwitchBackend() {
  const setUserDetails = useSetRecoilState(userDetailsState);
  const [backendUrl, setBackendUrl] = useRecoilState(backendUrlState);

  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [customUrl, setCustomUrl] = useState<string>('');

  const handleSubmit = () => {
    const newUrl =
      selectedOption === customOptionIndex
        ? customUrl
        : backendOptions[selectedOption].url;

    setUserDetails(null);
    setBackendUrl(newUrl);
    navigate(ROUTES.LOGIN);
  };

  let content: ReactNode;

  if (backendUrl !== DEFAULT_BACKEND_URL) {
    content = (
      <Alert severity='warning'>
        W tej sesji backend został już zmieniony. Odśwież stronę, aby zmienić ponownie.
      </Alert>
    );
  } else {
    content = (
      <>
        <List>
          {backendOptions.map((option, index) => (
            <OptionWrapper
              key={option.name}
              checked={selectedOption === index}
              onClick={() => {
                setSelectedOption(index);
              }}
            >
              <ListItemText primary={option.name} secondary={option.url} />
            </OptionWrapper>
          ))}

          <OptionWrapper
            onClick={() => {
              setSelectedOption(customOptionIndex);
            }}
            checked={selectedOption === customOptionIndex}
          >
            <ListItemText
              disableTypography
              primary={<Typography>Inny</Typography>}
              secondary={
                <TextField
                  sx={{ width: '100%' }}
                  size='small'
                  margin='dense'
                  placeholder='Podaj URL'
                  onChange={(event) => setCustomUrl(event.currentTarget.value)}
                />
              }
            />
          </OptionWrapper>
        </List>

        <Alert severity='info'>
          Po zatwierdzeniu użytkownik zostanie wylogowany.
          <br />
          Zmieniony backend obowiązuje tylko w obecnej sesji, to znaczy do momentu
          zamknięcia karty lub odświeżenia strony.
        </Alert>

        <Button variant='contained' onClick={handleSubmit}>
          Zatwierdź
        </Button>
      </>
    );
  }

  return (
    <PageLayout>
      <Stack spacing={1} alignItems='center'>
        <Typography variant='h3'>Zmiana backendu</Typography>
        {content}
      </Stack>
    </PageLayout>
  );
}

export default SwitchBackend;
