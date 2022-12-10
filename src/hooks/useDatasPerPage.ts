import { useState, useEffect } from "react";
import { Data } from "../schema/data";

export const useDatasPerPage = (
  projectId: number,
  NumberDataPerPage: number,
  page: number
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<Data[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Data[] = await window.storeApi.getStoreValue(
          String(projectId),
          "blueprint"
        );
        const filterData = data.filter((value, index) => {
          return (
            (page - 1) * NumberDataPerPage <= index &&
            index < page * NumberDataPerPage
          );
        });
        setData(filterData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [NumberDataPerPage, page, projectId]);

  return { data, isLoading, error };
};
