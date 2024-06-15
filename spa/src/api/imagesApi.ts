import { ApiRoutes } from "../routes/routePaths";
import { ImageDto } from "../endpoints";

interface StoreImagePayload {
  patientId: number;
  image: File;
}

const storeImage = async (
  storeImagePayload: StoreImagePayload
): Promise<void> => {
  const formData = new FormData();
  formData.append("patientId", String(storeImagePayload.patientId));
  formData.append("image", storeImagePayload.image);
  const response = await fetch(ApiRoutes.IMAGE_CREATE, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    console.error(await response.text());
    return Promise.reject(new Error("Failed creating new image"));
  }
  return Promise.resolve();
};

const getAllImages = async (patientId: number): Promise<ImageDto[]> => {
  const response = await fetch(ApiRoutes.IMAGE_INDEX(patientId), {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed fetching all images for patient");
  }

  return (await response.json()) as ImageDto[];
};

const getImage = async (path) => {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed fetching all images for patient");
  }

  return await response.json();
};

const removeImages = async (
  imageIds: number[],
  patientId: number
): Promise<void> => {
  const response = await fetch(ApiRoutes.IMAGE_DELETE, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageIds,
      patientId,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed removing image(s)");
  }

  return Promise.resolve();
};

export const imageApi = {
  storeImage,
  getAllImages,
  getImage,
  removeImages,
};
