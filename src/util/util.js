import flagsmith from "flagsmith";
import { useState, useEffect } from "react";

// Custom hook to initialize Flagsmith and get feature flags
export const useFeatureFlags = () => {
  const [featureFlags, setFeatureFlags] = useState({});
  useEffect(() => {
    if (Object.keys(featureFlags).length === 0) {
      flagsmith.init({
        environmentID: process.env.REACT_APP_FLAGSMITH_ENVIRONMENT_ID,
        onChange: () => {
          setFeatureFlags(flagsmith.getAllFlags());
        },
        onError: (error) => {
          console.error("Flagsmith initialization error:", error);
        },
      });
    }
  }, [featureFlags]); // Dependency array includes featureFlags to check for changes

  return featureFlags;
};

export const convertToTitleCase = (str) => {
  if (str === undefined || str === "") return "";
  return str.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
  );
};

export function toProperCase(input) {
  if (input === undefined) return "";
  if (typeof input !== "string") return input;
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
