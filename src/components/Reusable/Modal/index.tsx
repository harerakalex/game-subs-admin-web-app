import React, { FC, ReactElement } from 'react';
import { Modal } from '@material-ui/core';

interface Props {
  children: ReactElement;
  open: boolean;
  handleClose: () => void;
}
const CustomModal: FC<Props> = props => {
  const { children, open, handleClose } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
