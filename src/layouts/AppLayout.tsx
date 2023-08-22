import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';
import { getUserProfile } from '@/services/api/user';
import { useAppDispatch } from '@/services/hooks';
import { darkTheme, lightTheme } from '@/utils/Theme';

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper: any = styled.div`
  padding: ${({ currentPathLocation }: any) =>
    currentPathLocation.pathname !== '/my-channel' ? '22px 60px' : '0px 0px'};
`;

const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container className='className="w-full flex lg:max-w-lg-screen xl:max-w-xl-screen 2xl:max-w-2xl-screen min-h-screen overflow-y-[unset]"'>
        <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
        <Main>
          <Navbar></Navbar>
          <Wrapper currentPathLocation={location}>
            <Outlet />
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  );
};

export default AppLayout;
