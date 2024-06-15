import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, Button } from "@material-ui/core";
import { imageApi } from "../../../../api/imagesApi";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import PatientImageRemovalModal from "./PatientImageRemovalModal";
import { useSnackbar } from "notistack";
import GridContainer from "../../../../shared/widgets/container/GridContainer";
import GridItem from "../../../../shared/widgets/container/GridItem";
import { LoadingOverlayContext } from "../../../../contexts/LoaderOverlayProvider";
import { PatientImageUtilities } from "./patient-images-utils";
import { ImageDto } from "../../../../endpoints";
import { useTranslation } from "react-i18next";

interface PatientImagesProps {
  patientId: number;
}

export type modalState = boolean;

const PatientImages: React.FC<PatientImagesProps> = ({
  patientId,
}: PatientImagesProps): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const [patientImages, setPatientImages] = useState<ImageDto[] | undefined>(
    () => undefined
  );
  const [
    isConfirmImageRemovalModalOpen,
    setIsConfirmImageRemovalModalOpen,
  ] = useState<modalState>(false);
  const { setIsLoading } = useContext(LoadingOverlayContext);

  const updatePatientImages = () => {
    imageApi
      .getAllImages(patientId)
      .then((images) => {
        setPatientImages(images);
      })
      .catch(() => {
        enqueueSnackbar(t("images.fetch.error"), { variant: "error" });
      });
  };

  useEffect(() => {
    updatePatientImages();
  }, []);

  const formatImagesForPlugin = (
    images: ImageDto[]
  ): ReactImageGalleryItem[] => {
    return images.map((image: ImageDto) => {
      return {
        original: PatientImageUtilities.imageUrlResolver(image),
        thumbnail: PatientImageUtilities.imageUrlResolver(image),
        description: image.description ?? undefined,
      };
    });
  };

  const handleImageUpload = async (event) => {
    const fileList = event.target.files;
    if (fileList === null) {
      console.warn("Image upload found 0 files stored in upload image method");
      return;
    }
    const image = fileList[0];
    try {
      setIsLoading(true);
      await imageApi.storeImage({
        image,
        patientId,
      });
    } catch (e) {
      setIsLoading(false);
      enqueueSnackbar(t("upload.failed"), { variant: "error" });
    }
    const images = await imageApi.getAllImages(patientId);
    setIsLoading(false);
    setPatientImages(images);
  };

  return (
    <>
      {patientImages && (
        <PatientImageRemovalModal
          isOpen={isConfirmImageRemovalModalOpen}
          setIsOpen={setIsConfirmImageRemovalModalOpen}
          patientImages={patientImages}
          patientId={patientId}
          updatePatientImages={updatePatientImages}
        />
      )}
      <Card>
        <form encType="multipart/form-data">
          <input
            ref={fileInputRef}
            style={{ display: "none" }}
            type="file"
            accept="image/x-png,image/jpeg,image/jpg"
            onChange={(event) => handleImageUpload(event)}
          />
        </form>
        <CardHeader
          title={t("datastore")}
          titleTypographyProps={{
            variant: "subtitle1",
            color: "textSecondary",
          }}
          action={
            <>
              <GridContainer spacing={1}>
                <GridItem xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {t("upload")}
                  </Button>
                </GridItem>
                <GridItem xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      setIsConfirmImageRemovalModalOpen(
                        !isConfirmImageRemovalModalOpen
                      )
                    }
                  >
                    {t("remove")}
                  </Button>
                </GridItem>
              </GridContainer>
            </>
          }
        />
        <CardContent>
          {patientImages && patientImages.length > 0 && (
            <ImageGallery
              items={formatImagesForPlugin(patientImages)}
              showPlayButton={false}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PatientImages;
