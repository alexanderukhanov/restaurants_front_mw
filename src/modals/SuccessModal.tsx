import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

type Props = {
    isNewRestaurantCreated: boolean,
    successModalCloseHandler: () => void,
}

const SuccessModal: React.FC<Props> = ({isNewRestaurantCreated, successModalCloseHandler}) => (
    <Dialog
        open={isNewRestaurantCreated}
        onClose={successModalCloseHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Successfully uploaded!
            </DialogContentText>
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent: 'center'}}>
            <Button onClick={successModalCloseHandler}>Ok</Button>
        </DialogActions>
    </Dialog>
);

export default SuccessModal;
