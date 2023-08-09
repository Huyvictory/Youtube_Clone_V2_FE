import { Cancel } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { PROFILE_FORMS } from '@/constants';
import { IUserAuthentication } from '@/contracts/auth';
import { updateUserPassword, updateUserProfile } from '@/services/api/user';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { showNotification } from '@/utils/notification';

const ModalDialogForms = ({
  children,
  open,
  setOpen,
  modal_form_name,
}: {
  children: JSX.Element;
  open: boolean;
  setOpen: (open: boolean) => void;
  modal_form_name: string;
}) => {
  const { userPersonalDetail } = useAppSelector((state) => state.user);
  const {
    reset,
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IUserAuthentication>({ mode: 'all' });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userPersonalDetail) {
      reset({
        firstname: userPersonalDetail.firstname,
        lastname: userPersonalDetail.lastname,
        username: userPersonalDetail.username,
        sex: userPersonalDetail.sex,
        Dob: dayjs(userPersonalDetail.Dob),
      });
    }
  }, [userPersonalDetail]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    const dataSentToServer = {
      firstname: null,
      lastname: null,
      username: null,
      sex: null,
      Dob: null,
    };

    if (modal_form_name === PROFILE_FORMS.PROFILE_NAME) {
      dispatch(
        updateUserProfile({
          ...dataSentToServer,
          firstname: getValues('firstname'),
          lastname: getValues('lastname'),
          username: getValues('username'),
        }),
      ).then((res: any) => {
        if (res.payload) {
          showNotification(`Update ${modal_form_name} successfully`, 'success', 2000);
        }
        setOpen(false);
      });
    } else if (modal_form_name === PROFILE_FORMS.PROFILE_BIRTHDAY) {
      dispatch(
        updateUserProfile({
          ...dataSentToServer,
          Dob: getValues('Dob'),
        }),
      ).then((res: any) => {
        if (res.payload) {
          showNotification(`Update ${modal_form_name} successfully`, 'success', 2000);
        }
        setOpen(false);
      });
    } else if (modal_form_name === PROFILE_FORMS.PROFILE_GENDER) {
      dispatch(
        updateUserProfile({
          ...dataSentToServer,
          sex: getValues('sex'),
        }),
      ).then((res: any) => {
        if (res.payload) {
          showNotification(`Update ${modal_form_name} successfully`, 'success', 2000);
        }
        setOpen(false);
      });
    } else if (modal_form_name === PROFILE_FORMS.PROFILE_PASSWORD) {
      const updatePasswordPayload = getValues('password');
      dispatch(updateUserPassword(updatePasswordPayload as any)).then((res: any) => {
        if (res.payload) {
          showNotification(`Update ${modal_form_name} successfully`, 'success', 2000);
          setOpen(false);
        }
      });
    }
  };

  return (
    <div>
      <Dialog
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Box component={'form'} noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            id="scroll-dialog-title"
            // eslint-disable-next-line react/no-children-prop
            children={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Change your {modal_form_name}</div>
                <IconButton
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Cancel />
                </IconButton>
              </div>
            }
          ></DialogTitle>
          <DialogContent dividers={true}>
            {React.cloneElement(children, {
              register: register,
              errors: errors,
              control: control,
              getValues: getValues,
              setValue: setValue,
            })}
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default ModalDialogForms;
