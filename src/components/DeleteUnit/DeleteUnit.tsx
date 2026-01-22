import { useEffect, useState, useMemo } from 'react';

import SelectComponent from '../SelectComponent/SelectComponent';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';

import '../../pages/Admin/admin.scss';

interface BaseItem {
  id: string | number;
  name: string;
}
interface DeleteUnitProps<T extends BaseItem> {
  title: string;
  allItems: T[];
  isPending: boolean;
  mutate: (id: string) => void;
  pendingDelete: boolean;
}

const DeleteUnit = <T extends BaseItem>({
  title,
  allItems = [],
  isPending,
  mutate,
  pendingDelete,
}: DeleteUnitProps<T>) => {
  //   const { data: allItems, isPending } = useAllItems();
  //   const { mutate, isPending: pendingDelete } = useDeleteItem();
  const [selectedOption, setSelectedOption] = useState({ value: '', label: '' });

  const trimmedArray = useMemo(
    () => allItems && allItems.map(({ id, name }) => ({ value: String(id), label: name })),
    [allItems]
  );

  useEffect(() => {
    setSelectedOption(trimmedArray[0]);
  }, [trimmedArray]);

  const handleDelete = () => {
    console.log(selectedOption?.value);
    if (!selectedOption?.value) return;

    mutate(selectedOption?.value);
  };

  return (
    <div className="manage__unit">
      <h2 className="manage__unit__title">{title}</h2>

      <div className="manage__container">
        {!isPending && (
          <SelectComponent
            className="manage__select"
            options={trimmedArray}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        )}

        <button className="manage__button" onClick={handleDelete} type="button">
          {pendingDelete ? <Spinner size={spinnerSize.sm} /> : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default DeleteUnit;
