import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      <Outlet />
    </Container>
  );
};

export default PublicLayout;
