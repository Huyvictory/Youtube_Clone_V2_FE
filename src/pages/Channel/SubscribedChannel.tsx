import { Avatar, Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getSubscribedChannels } from '@/services/api/user';
import { useAppDispatch, useAppSelector } from '@/services/hooks';

const SubscribedChannel = () => {
  const { subscribedChannels } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { channelId } = useParams();

  useEffect(() => {
    dispatch(getSubscribedChannels({ channelId: channelId as string }));
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Subscribed Channels
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: '1rem',
        }}
      >
        {subscribedChannels.length > 0 &&
          subscribedChannels.map((el, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '0.5rem',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigate(`/channelDetail/${el._id}?currentTab=Home`);
                  window.location.reload();
                }}
              >
                <Avatar src={el.channel_image_url} sx={{ width: 103, height: 103 }} />
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {el.channel_name}
                </Typography>
                <Typography variant="subtitle1">
                  {el.channel_subscribers} Subscribers
                </Typography>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default SubscribedChannel;
