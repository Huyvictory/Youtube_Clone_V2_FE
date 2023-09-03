import { DeleteOutline, EditOutlined, PlayArrowOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import React from 'react';
import tw from 'tailwind-styled-components';

const PlaylistDetail = () => {
  const SideBarContainer = tw.div`
    basis-80
    grow-1
    p-4
    relative
    before:content-['']
    before:block
    before:absolute
    before:w-full
    before:h-full
    before:top-0
    before:left-0
    before:bg-[url('https://www.designbombs.com/wp-content/uploads/2023/01/youtube-thumbnail-designs-for-high-ctr.png')]
    before:bg-no-repeat
    before:blur-sm
    before:bg-cover
  `;
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', position: 'relative' }}>
      <SideBarContainer id="sidebar">
        <div className="fixed">
          <div className="flex flex-col w-[288px] h-full gap-y-4">
            <Box sx={{ display: 'flex' }}>
              <img
                alt="playlist_representation_image"
                src="https://www.designbombs.com/wp-content/uploads/2023/01/youtube-thumbnail-designs-for-high-ctr.png"
                className="object-cover w-full h-[175px] rounded-lg"
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Playlist name
              </Typography>
              <IconButton>
                <EditOutlined />
              </IconButton>
            </Box>
            <Box>
              <span>
                belongs to <span className="font-bold">User name</span>
              </span>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
              <Button variant="contained" fullWidth>
                Play all videos{' '}
                <span>
                  <PlayArrowOutlined />
                </span>
              </Button>
              <Button variant="contained" fullWidth color="error">
                Delete playlist
              </Button>
            </Box>
          </div>
        </div>
      </SideBarContainer>
      <div
        id="main_content"
        className="basis-0 grow-[999]"
        style={{ minInlineSize: '50%' }}
      >
        <Box>
          <List
            sx={{ display: 'flex', flexDirection: 'column', padding: '0.5rem' }}
            subheader={<div id="nested-list-subheader">Videos of playlist</div>}
          >
            {Array(5)
              .fill(0)
              .map((el, index) => {
                return (
                  <ListItemButton
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Box sx={{ display: 'flex', columnGap: '1rem' }}>
                      <div className="flex w-[9vw] h-[10vh]">
                        <img
                          alt="video_thumbnail_playlist"
                          src="https://www.designbombs.com/wp-content/uploads/2023/01/youtube-thumbnail-designs-for-high-ctr.png"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-bold">Video title</p>
                        <p>Channel • 0 Views • 2 weeks ago</p>
                      </div>
                    </Box>
                    <Box>
                      <IconButton>
                        <DeleteOutline />
                      </IconButton>
                    </Box>
                  </ListItemButton>
                );
              })}
          </List>
        </Box>
        <Divider />
        <Box>
          <List
            sx={{ display: 'flex', flexDirection: 'column', padding: '0.5rem' }}
            subheader={<div id="nested-list-subheader">Recommended video</div>}
          >
            {Array(5)
              .fill(0)
              .map((el, index) => {
                return (
                  <ListItemButton
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Box sx={{ display: 'flex', columnGap: '1rem' }}>
                      <div className="flex w-[9vw] h-[10vh]">
                        <img
                          alt="video_thumbnail_playlist"
                          src="https://www.designbombs.com/wp-content/uploads/2023/01/youtube-thumbnail-designs-for-high-ctr.png"
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-bold">Video title</p>
                        <p>Channel • 0 Views • 2 weeks ago</p>
                      </div>
                    </Box>
                    <Box>
                      <IconButton>
                        <DeleteOutline />
                      </IconButton>
                    </Box>
                  </ListItemButton>
                );
              })}
          </List>
        </Box>
      </div>
    </Box>
  );
};

export default PlaylistDetail;
