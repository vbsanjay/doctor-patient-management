import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { imageApi } from "../../../../api/imagesApi";
import styled from "styled-components";
import { modalState } from "./PatientImages";
import GridItem from "../../../../shared/widgets/container/GridItem";
import GridContainer from "../../../../shared/widgets/container/GridContainer";
import { LoadingOverlayContext } from "../../../../contexts/LoaderOverlayProvider";
import { PatientImageUtilities } from "./patient-images-utils";
import { ImageDto } from "../../../../endpoints";
import { useTranslation } from "react-i18next";

interface PatientImageRemovalModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: modalState) => void;
  patientId: number;
  patientImages: ImageDto[];
  updatePatientImages: () => void;
}

interface PatientImageProps {
  readonly isSelected: boolean;
}
const PatientImage = styled.img<PatientImageProps>`
  width: 100%;
  height: 100%;
  ${({ theme, isSelected }): string => {
    return `outline: ${
      isSelected ? `5px solid ${theme.palette.primary.main}` : undefined
    };`;
  }};
`;

const PatientImageRemovalModal: React.FC<PatientImageRemovalModalProps> = ({
  isOpen,
  setIsOpen,
  patientId,
  patientImages,
  updatePatientImages,
}: PatientImageRemovalModalProps): JSX.Element => {
  const { setIsLoading } = useContext(LoadingOverlayContext);
  const { t } = useTranslation();
  const [selectedImageIds, setSelectedImageIds] = useState<ImageDto["id"][]>(
    []
  );

  const handleRemoval = async () => {
    setIsLoading(true);
    await imageApi.removeImages(selectedImageIds, patientId);
    await updatePatientImages();
    setIsOpen(!isOpen);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen, setIsOpen]);

  const handleImageSelect = (currentImageId: number) => {
    const isImageAlreadySelected = Boolean(
      selectedImageIds.find(
        (imageId: ImageDto["id"]) => imageId === currentImageId
      )
    );
    const imageIdsWithoutCurrentImageId = selectedImageIds.filter(
      (imageId: ImageDto["id"]) => imageId !== currentImageId
    );
    const addCurrentImageToList = selectedImageIds.concat([currentImageId]);
    const selectedImages = isImageAlreadySelected
      ? imageIdsWithoutCurrentImageId
      : addCurrentImageToList;
    setSelectedImageIds(selectedImages);
  };

  const renderImages = () => {
    return patientImages.map((patientImage: ImageDto) => {
      return (
        <GridItem key={patientImage.id} sm={6} md={4} lg={3}>
          <PatientImage
            isSelected={Boolean(
              selectedImageIds.find(
                (imageId: ImageDto["id"]) => imageId === patientImage.id
              )
            )}
            onClick={() => handleImageSelect(patientImage.id)}
            key={patientImage.id}
            src={PatientImageUtilities.imageUrlResolver(patientImage)}
            alt={patientImage.description ?? "Patient image"}
          />
        </GridItem>
      );
    });
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={isOpen}
      onClose={() => setIsOpen(!isOpen)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>{t("choose.images.for.removal.promp")}</DialogTitle>
      <DialogContent>
        <GridContainer>{renderImages()}</GridContainer>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {t("cancel")}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleRemoval()}
        >
          {t("remove")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientImageRemovalModal;
