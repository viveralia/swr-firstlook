import { useState } from "react";

const useRequest = (options = { handleManualError: false }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (fetcher) => {
    setIsLoading(true);
    try {
      const response = await fetcher();
      setData(response);
    } catch (error) {
      setError(error);
      !options.handleManualError && alert(error.message);
    }
    setIsLoading(false);
  };

  return {
    makeRequest,
    data,
    isLoading,
    error,
  };
};

export default useRequest;
