import {
  Backdrop,
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getListVideos, getVideoCategories } from '@/services/api/video';
import { useAppDispatch, useAppSelector } from '@/services/hooks';

import Card from '../components/Card';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const CustomToggleButton = styled(ToggleButton)`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

const Home = () => {
  const { isLoadingVideo_GetList, videoList, videoCategoriesList } = useAppSelector(
    (state) => state.video,
  );

  const [activeVideoCategory, setActiveVideoCategory] = useState<string | null>('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVideoCategories());
  }, []);

  useEffect(() => {
    dispatch(
      getListVideos({
        page: 1,
        limit: 10,
        videoCategory: activeVideoCategory ?? undefined,
      }),
    );
  }, [activeVideoCategory]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignmentButtonValue: string | null,
  ) => {
    if (newAlignmentButtonValue !== null) {
      setActiveVideoCategory(newAlignmentButtonValue);
    }
  };

  return (
    <Container>
      <Box sx={{ mb: 2 }}>
        <ToggleButtonGroup
          color="primary"
          fullWidth
          value={activeVideoCategory}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value={''}>All</ToggleButton>
          {videoCategoriesList &&
            videoCategoriesList?.map((videoCategory, index) => (
              <ToggleButton key={videoCategory._id} value={videoCategory._id}>
                {videoCategory.video_category_name}
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {videoList &&
          videoList?.map((video) => (
            <Card key={video._id} type={'undefined'} video={video} />
          ))}
      </Box>

      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoadingVideo_GetList}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default Home;
