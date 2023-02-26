type Props<T> = {
  updateDatas: T;
  setUpdateDatas: React.Dispatch<React.SetStateAction<T>>;
};

type ReturnType = {
  handleEditData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectData: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCheckData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSetData: <S>(name: string, value: S) => void;
  handleCheckRadio: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

//TODO T[e.target.name]の型によりupdateの型を変更できるようにする
export const useHandleForm = <T>({
  updateDatas,
  setUpdateDatas,
}: Props<T>): ReturnType => {
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

  const handleCheckRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, id } = e.target;
    setUpdateDatas({ ...updateDatas, [name]: id });
  };

  const handleSetData = <S>(name: string, value: S) => {
    setUpdateDatas({ ...updateDatas, [name]: value });
  };

  return {
    handleEditData,
    handleSelectData,
    handleCheckData,
    handleSetData,
    handleCheckRadio,
  };
};
