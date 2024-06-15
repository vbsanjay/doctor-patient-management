import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

interface RemovePatientConfirmationModalProps {
  handleAccept: () => void;
  handleClose: () => void;
  open: boolean;
}

const RemovePatientConfirmationModal: React.FC<RemovePatientConfirmationModalProps> = ({
  handleAccept,
  handleClose,
  open,
}: RemovePatientConfirmationModalProps) => {
  const { t } = useTranslation();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      onClose={handleClose}
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">
        <Typography variant="body1">
          {t("patient.removal.prompt.question")}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2">
          {t("patient.removal.prompt.description")}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleClose}
          color="primary"
          variant="contained"
        >
          {t("no.cancel")}
        </Button>
        <Button onClick={handleAccept} color="secondary" variant="contained">
          {t("yes.continue")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemovePatientConfirmationModal;
