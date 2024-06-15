import React, { useState } from "react";
import { Button } from "@material-ui/core";
import GridItem from "../../../../../shared/widgets/container/GridItem";
import GridContainer from "../../../../../shared/widgets/container/GridContainer";
import RemoveDiagnosisEventConfirmationModal from "./RemoveDiagnosisEventConfirmationModal";

import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import SaveTwoToneIcon from "@material-ui/icons/SaveTwoTone";
import PrintTwoToneIcon from "@material-ui/icons/PrintTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

interface DiagnosisEventActionButtonsProp {
  isEditModeEnabled: boolean;
  handleSubmit: () => void;
  handlePrint: (() => void) | undefined;
  handleDelete: () => void;
  handleUpdate: () => void;
}

const DiagnosisEventActionButtons: React.FC<DiagnosisEventActionButtonsProp> = ({
  isEditModeEnabled,
  handlePrint,
  handleSubmit,
  handleDelete,
  handleUpdate,
}: DiagnosisEventActionButtonsProp) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggleModal = () => setOpen(!open);

  return (
    <>
      <RemoveDiagnosisEventConfirmationModal
        handleAccept={handleDelete}
        handleClose={handleToggleModal}
        open={open}
      />
      <GridContainer style={{ marginBottom: "15px" }}>
        <GridItem xs={4}>
          <Button
            type="submit"
            onClick={isEditModeEnabled ? handleSubmit : handleUpdate}
            variant="outlined"
            color="primary"
          >
            {isEditModeEnabled ? <SaveTwoToneIcon /> : <EditTwoToneIcon />}
          </Button>
        </GridItem>
        <GridItem xs={4}>
          <Button
            onClick={() => (handlePrint ? handlePrint() : undefined)}
            variant="outlined"
            color="primary"
          >
            <PrintTwoToneIcon />
          </Button>
        </GridItem>
        <GridItem xs={4}>
          <Button
            onClick={handleToggleModal}
            variant="outlined"
            color="primary"
          >
            <DeleteForeverTwoToneIcon />
          </Button>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default DiagnosisEventActionButtons;
