import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { ModalData } from '../components/Dashboard/Dashboard';

type Props = {
    modalData: ModalData,
    setModalData: (data: ModalData) => void,
    deleteDish: (data: number) => void,
}

const ConfirmationModal: React.FC<Props> = ({modalData, setModalData, deleteDish}) => (
    <Dialog
        open={modalData.isOpened}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you want delete this?
            </DialogContentText>
        </DialogContent>
        <DialogActions style={{display: 'flex', justifyContent: 'center'}}>
            <Button id="button-delete-cancel" onClick={
                () => setModalData({isOpened: false, index: 0})
            }>Cancel</Button>
            <Button id="button-delete-accept" onClick={
                () => {
                    deleteDish(modalData.index);
                    setModalData({isOpened: false, index: 0});
                }
            }>Delete</Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmationModal;
