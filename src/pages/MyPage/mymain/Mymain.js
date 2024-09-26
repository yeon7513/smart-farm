import {
  Avatar,
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { teal } from '@mui/material/colors';
import React from 'react';
import Container from '../../layout/container/Container';

import { useComponentContext } from '../../../context/ComponentContext';

function Mymain(props) {
  const user = JSON.parse(localStorage.getItem('user')) || '';
  const { setCurrComp } = useComponentContext();
  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: teal[500],
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  // 전화번호 포맷 변환 및 마스킹 함수
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    const parts = phoneNumber.split('-');
    if (parts.length === 3) {
      const areaCode = parts[0];
      const firstPart = parts[1].slice(0, 2) + '**';
      const secondPart = parts[2].slice(0, 2) + '**';
      return `+82 ${areaCode.slice(1)}-${firstPart}-${secondPart}`;
    }
    return phoneNumber;
  };

  // 이메일 주소 마스킹 처리 함수
  const maskEmail = (email) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    const [domainName, domainExt] = domain.split('.');

    const maskedLocalPart = localPart.slice(0, 2) + '**';
    const maskedDomainName = domainName.slice(0, 2) + '**';

    return `${maskedLocalPart}@${maskedDomainName}.${domainExt}`;
  };

  // 주소 마스킹 처리 함수
  const maskAddress = (address) => {
    if (!address) return '';

    // 주소를 공백으로 나눔
    const parts = address.split(' ');

    if (parts.length < 5) {
      return '주소 형식이 올바르지 않습니다.';
    }

    // 도/시/도
    const maskedProvince = parts[0];

    // 시/군/구
    const maskedCity = parts[1];

    // 구/군
    const maskedDistrict = parts[2];

    // 동/읍/면
    const maskedNeighborhood = parts[3];

    // 건물명
    const maskedBuilding = parts.slice(4, -1).join(' ');

    // 건물 호수
    const maskedUnit = parts[parts.length - 1].replace(/\d/g, '*');

    return `${maskedProvince} ${maskedCity} ${maskedDistrict} ${maskedNeighborhood} ${maskedBuilding} ${maskedUnit}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              m: 3,
              backgroundColor: 'secondary.main',
              width: '70px',
              height: '70px',
            }}
          />
          <Typography component="h1" variant="h5">
            {user.name}
          </Typography>
          <Typography>
            Phone:{' '}
            {formatPhoneNumber(user.number) || '전화번호 정보가 없습니다.'}
          </Typography>
          <Typography>
            Mail: {maskEmail(user.email) || '이메일 정보가 없습니다.'}{' '}
          </Typography>
          <Typography>
            address: {maskAddress(user.address) || '주소 정보가 없습니다.'}{' '}
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              onClick={() => setCurrComp('Myinfo')}
            >
              내 정보 수정하기
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Mymain;
