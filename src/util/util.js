import flagsmith from "flagsmith";
import { useState, useEffect } from "react";

// Custom hook to initialize Flagsmith and get feature flags
const useFeatureFlags = () => {
  const [featureFlags, setFeatureFlags] = useState({});

  useEffect(() => {
    flagsmith.init({
      environmentID: process.env.REACT_APP_FLAGSMITH_ENVIRONMENT_ID,
      onChange: () => {
        setFeatureFlags(flagsmith.getAllFlags());
      },
      onError: (error) => {
        console.error("Flagsmith initialization error:", error);
      },
    });
  }, []); // Empty dependency array ensures this runs once on mount

  return featureFlags;
};

// Custom hook to check if a feature is enabled
export const useIsFeatureEnabled = (featureKey) => {
  const featureFlags = useFeatureFlags();

  // Check if the feature exists in the flags object
  if (featureFlags && featureFlags[featureKey.toLowerCase()]) {
    return featureFlags[featureKey.toLowerCase()].enabled;
  }

  // Return null if the feature is not found
  return null;
};
