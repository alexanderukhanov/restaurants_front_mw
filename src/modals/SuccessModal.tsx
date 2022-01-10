import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

type Props = {
    isNewEntityCreated: boolean,
    successModalCloseHandler: () => void,
    text: string,
}

const SuccessModal: React.FC<Props> = ({isNewEntityCreated, successModalCloseHandler, text}) => (
    <Dialog
        open={isNewEntityCreated}
        onClose={successModalCloseHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {text}
            </DialogContentText>
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent: 'center'}}>
            <Button onClick={successModalCloseHandler}>Ok</Button>
        </DialogActions>
    </Dialog>
);

export default SuccessModal;
