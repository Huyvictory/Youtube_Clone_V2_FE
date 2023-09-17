import { VideoCallOutlined } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { profileMenuSettings } from '@/constants';
import { signOut } from '@/services/api/auth';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { removeLocalStorageKey } from '@/utils/localStorage';

import ModalUploadVideo from './video/ModalUploadVideo';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 100;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const UploadVideoIcon = styled(VideoCallOutlined)`
  color: ${({ theme }) => theme.text};
`;

const Navbar = () => {
  const { userPersonalDetail } = useAppSelector((state) => state.user);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const hanldeLogout = () => {
    setAnchorElUser(null);
    dispatch(signOut()).then((res: any) => {
      if (res.payload || !res.payload) {
        removeLocalStorageKey('@AUTH_TOKEN_YC');
        window.location.href = '/';
      }
    });
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchOutlinedIcon />
        </Search>
        <Box>
          <Tooltip title="Upload your video">
            <IconButton
              sx={{ mr: 2 }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <UploadVideoIcon fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Open user profile settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="User Avatar"
                src={
                  !userPersonalDetail?.user_avatar_media_id
                    ? 'https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg'
                    : userPersonalDetail.user_avatar_media_id.media_url
                }
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {profileMenuSettings.map((setting, index) => {
              if (!setting.to && setting.profileMenuName === 'Logout') {
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      setting.onClickHanlder_MenuItem(hanldeLogout);
                    }}
                  >
                    <Typography textAlign="center">{setting.profileMenuName}</Typography>
                  </MenuItem>
                );
              }

              if (setting.profileMenuName === 'My Channel') {
                return (
                  <Link
                    key={index}
                    to={`/channelDetail/${userPersonalDetail?.channel_id}?currentTab=Home`}
                  >
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setting.onClickHanlder_MenuItem(handleCloseUserMenu);
                      }}
                    >
                      <Typography textAlign="center">
                        {setting.profileMenuName}
                      </Typography>
                    </MenuItem>
                  </Link>
                );
              }

              return (
                <Link key={index} to={setting.to as string}>
                  <MenuItem
                    onClick={() => {
                      setting.onClickHanlder_MenuItem(handleCloseUserMenu);
                    }}
                  >
                    <Typography textAlign="center">{setting.profileMenuName}</Typography>
                  </MenuItem>
                </Link>
              );
            })}
          </Menu>
        </Box>
      </Wrapper>
      {open && <ModalUploadVideo open={open} setOpen={setOpen} />}
    </Container>
  );
};

export default Navbar;
