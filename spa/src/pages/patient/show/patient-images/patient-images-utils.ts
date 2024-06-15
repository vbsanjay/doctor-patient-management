import { ImageDto } from "../../../../endpoints";

export class PatientImageUtilities {
  public static imageUrlResolver(image: ImageDto): string {
    return `/api/image/${image.patientId}/${image.fileName}`;
  }
}
