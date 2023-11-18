import React from "react";
import { getEveryThirdItem } from "../../helpers/HelperFunctions";

type ExpectedData = {
  name: string;
  url: string;
};

type UseDataProps = {
  dataOffSet: number;
  difficulty: number;
};

export default function useData({ dataOffSet, difficulty }: UseDataProps) {
  const [data, setData] = React.useState<ExpectedData[] | null>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${dataOffSet}&limit=${difficulty}`
        );

        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }

        let tempData = await response.json();
        tempData = getEveryThirdItem(tempData.results);

        tempData = tempData.map((obj: ExpectedData) => ({
          ...obj,
          clicked: false,
        }));

        setData(tempData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataOffSet, difficulty]);

  return { data, setData, error, loading };
}
