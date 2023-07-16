import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';
import { darkTheme, lightTheme } from '@/utils/Theme';

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container className='className="w-full flex lg:max-w-lg-screen xl:max-w-xl-screen 2xl:max-w-2xl-screen min-h-screen overflow-y-[unset]"'>
        <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
        <Main>
          <Navbar></Navbar>
          <Wrapper>
            <Outlet />
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  );
};

export default AppLayout;
