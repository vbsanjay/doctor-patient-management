import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import LoadingOverlay from "react-loading-overlay";
import { useTranslation } from "react-i18next";

type LoadingOverlayContextType = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const LoadingOverlayContext = createContext(
  {} as LoadingOverlayContextType
);

const LoaderOverlayContextProvider = ({ children }): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <LoadingOverlayContext.Provider
      value={{
        setIsLoading,
      }}
    >
      <LoadingOverlay
        active={isLoading}
        spinner
        text={t("uploading.image")}
      >
        {children}
      </LoadingOverlay>
    </LoadingOverlayContext.Provider>
  );
};

export default LoaderOverlayContextProvider;
