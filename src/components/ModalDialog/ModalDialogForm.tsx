import { Cancel } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useForm } from 'react-hook-form';

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
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<any>({ mode: 'onChange' });

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    console.log(data);
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
