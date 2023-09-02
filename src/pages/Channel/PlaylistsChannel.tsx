import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import ModalCreatePlaylist from '@/components/Playlist/ModalCreatePlaylist';
import PlaylistItem from '@/components/Playlist/PlaylistItem';
import { getListPlaylists_Channel } from '@/services/api/playlist';
import { useAppDispatch, useAppSelector } from '@/services/hooks';

const PlaylistsChannel = () => {
  const { userPersonalDetail } = useAppSelector((state) => state.user);
  const { playlist_data } = useAppSelector((state) => state.playlist);

  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getListPlaylists_Channel({ channel_id: userPersonalDetail?.channel_id as string }),
    );
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add a new playlist
        </Button>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Created playlist
        </Typography>
      </Box>
      <Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {playlist_data.length > 0 &&
          playlist_data.map((playlist) => {
            return <PlaylistItem key={playlist._id} playlist={playlist} />;
          })}
      </Box>
      {open && <ModalCreatePlaylist open={open} setOpen={setOpen} />}
    </Box>
  );
};

export default PlaylistsChannel;
