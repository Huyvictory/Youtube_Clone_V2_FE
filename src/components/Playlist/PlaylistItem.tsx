import { MoreVertOutlined, PlaylistPlayOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { PlaylistDetail } from '@/contracts/playlist';

const PlaylistItem = ({ playlist }: { playlist: PlaylistDetail }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '12vw',
        marginTop: '2rem',
        cursor: 'pointer',
      }}
      onClick={() => {
        navigate(`/playlist-detail/${playlist._id}`);
      }}
    >
      <Box sx={{ display: 'flex', height: '15vh', position: 'relative' }}>
        <img
          src={
            playlist.playlist_respresentation_image_id
              ? playlist.playlist_respresentation_image_id.media_url
              : 'https://www.designbombs.com/wp-content/uploads/2023/01/youtube-thumbnail-designs-for-high-ctr.png'
          }
          width={'100%'}
          height={'100%'}
          style={{ objectFit: 'cover' }}
          alt="preview_thumbnail_playlist"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            padding: '0.5rem 1rem',
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: 'rgba(89, 89, 89, 0.6)',
          }}
        >
          <PlaylistPlayOutlined />
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {playlist.playlist_videos.length} video
          </Typography>
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: '10px 5px',
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {playlist.playlist_name}
          </Typography>
          <Link sx={{ cursor: 'pointer' }}>Show playlist details</Link>
        </Box>
        <MoreVertOutlined />
      </Box>
    </Box>
  );
};

export default PlaylistItem;
