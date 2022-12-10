type Props<T> = {
  updateDatas: T;
  setUpdateDatas: React.Dispatch<React.SetStateAction<T>>;
};

export const useHandleForm = <T>({ updateDatas, setUpdateDatas }: Props<T>) => {
  const handleEditData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateDatas({ ...updateDatas, [name]: value });
  };

  const handleSelectData = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdateDatas({ ...updateDatas, [name]: value });
  };

  const handleCheckData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUpdateDatas({ ...updateDatas, [name]: checked });
  };

  const handleSetData = <S>(name: string, value: S) => {
    setUpdateDatas({ ...updateDatas, [name]: value });
  };

  return { handleEditData, handleSelectData, handleCheckData, handleSetData };
};
