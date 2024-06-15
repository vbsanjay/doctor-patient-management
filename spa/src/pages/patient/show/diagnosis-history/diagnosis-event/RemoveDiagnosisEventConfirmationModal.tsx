import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

interface RemoveDiagnosisEventConfirmationModalProps {
  handleAccept: () => void;
  handleClose: () => void;
  open: boolean;
}

const RemoveDiagnosisEventConfirmationModal: React.FC<RemoveDiagnosisEventConfirmationModalProps> = ({
  handleAccept,
  handleClose,
  open,
}: RemoveDiagnosisEventConfirmationModalProps) => {
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
          {t("diagnosis.history.removal.prompt.question")}
        </Typography>
      </DialogTitle>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleClose}
          color="primary"
          variant="contained"
        >
          {t("no.cancel")}
        </Button>
        <Button onClick={handleAccept} color="primary" variant="contained">
          {t("yes.continue")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveDiagnosisEventConfirmationModal;
