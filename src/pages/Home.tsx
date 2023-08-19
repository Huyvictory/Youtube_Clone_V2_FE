import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import styled from 'styled-components';

import { getListVideos } from '@/services/api/video';
import { useAppDispatch, useAppSelector } from '@/services/hooks';

import Card from '../components/Card';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = () => {
  const { isLoadingVideo_GetList, videoList } = useAppSelector((state) => state.video);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getListVideos({ page: 1, limit: 10 }));
  }, []);

  return (
    <Container>
      {videoList &&
        videoList?.map((video) => (
          <Card key={video._id} type={'undefined'} video={video} />
        ))}

      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoadingVideo_GetList}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default Home;
