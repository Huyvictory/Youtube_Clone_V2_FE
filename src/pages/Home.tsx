import '@/css/Infinite_Scrolling.css';

import {
  Backdrop,
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';

import { getListVideos, getVideoCategories } from '@/services/api/video';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import {
  resetVideoList,
  resetVideoState,
  updateNextVideoPage,
} from '@/services/store/video';

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
  const { isLoadingVideo_GetList, videoList, videoCategoriesList, videoPage } =
    useAppSelector((state) => state.video);

  const [activeVideoCategory, setActiveVideoCategory] = useState<string | null>('');
  const [hasMore, setHasMore] = useState<boolean>(true);

  const previousVideoCategoryRef = useRef(activeVideoCategory);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVideoCategories());

    return () => {
      dispatch(resetVideoState());
    };
  }, []);

  useEffect(() => {
    if (previousVideoCategoryRef.current !== activeVideoCategory) {
      previousVideoCategoryRef.current = activeVideoCategory;
      dispatch(resetVideoList());

      dispatch(
        getListVideos({
          page: 1,
          limit: 12,
          videoCategory: activeVideoCategory ?? undefined,
        }),
      );

      setHasMore(true);
      return;
    }
    dispatch(
      getListVideos({
        page: videoPage,
        limit: 12,
        videoCategory: activeVideoCategory ?? undefined,
      }),
    ).then((res: any) => {
      if (res.payload.data.data.length === 0) {
        setHasMore(false);
      }
    });
  }, [activeVideoCategory, videoPage]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignmentButtonValue: string | null,
  ) => {
    if (newAlignmentButtonValue !== null) {
      setActiveVideoCategory(newAlignmentButtonValue);
      dispatch(updateNextVideoPage(1));
    }
  };

  const handleNextVideoPage_InfiniteScrolling = () => {
    setTimeout(() => {
      dispatch(updateNextVideoPage(videoPage + 1));
    }, 2000);
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
        <InfiniteScroll
          dataLength={videoList.length}
          next={() => {
            handleNextVideoPage_InfiniteScrolling();
          }}
          hasMore={hasMore}
          loader={<h1>Loading new video...</h1>}
        >
          {videoList.length > 0 &&
            videoList.map((video) => (
              <Card key={video._id} type={'undefined'} video={video} />
            ))}
        </InfiniteScroll>
      </Box>

      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoadingVideo_GetList}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default Home;
