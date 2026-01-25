import Select from 'react-select';
import { MultiValue } from 'react-select';
import { useAddIngredientsToItem, useGetAllIngredients } from '../../hooks/useIngredients';
import { useAllItems } from '../../hooks/useItems';
import { useState } from 'react';
import { ISendIngredients } from '../../API/ingredients/ingredients.interface';
import { customSelectStyles } from '../../styles/selectStyles';
import SelectComponent from '../SelectComponent/SelectComponent';

interface ISelectedType {
  value: string;
  label: string;
}

const AddIngredientsToItem = () => {
  const [ingredients, setIngredients] = useState<ISelectedType[]>([]);
  const [item, setItem] = useState<ISelectedType>({ value: '', label: '' });

  const { data, isPending } = useGetAllIngredients();
  const { data: allItems, isPending: pendingItems } = useAllItems();
  const { mutate, isPending: pendingUpdateItems } = useAddIngredientsToItem();

  const trimmedArrayIngredients =
    data && data.map(({ id, name }) => ({ value: String(id), label: name }));
  const trimmedArrayItems =
    (allItems && allItems.map(({ id, name }) => ({ value: String(id), label: name }))) || [];

  const handleChangeIngredients = (newValue: MultiValue<ISelectedType>) => {
    setIngredients([...newValue]);
  };

  const handleSubmit = () => {
    const onlyIds = ingredients.map(({ value }) => +value);

    const ingredientsFormat: ISendIngredients = {
      ingredientIds: onlyIds,
    };

    mutate({
      ingredientIds: ingredientsFormat,
      itemId: item.value,
    });
  };

  return (
    <>
      <div className="add__data__container">
        <h2 className="manage__unit__title">Add ingredients to item</h2>

        <h3 className="add__data__label">Choose item</h3>
        {pendingItems ? (
          <div>Loading...</div>
        ) : (
          <SelectComponent
            className="add__data__select"
            options={trimmedArrayItems}
            selectedOption={item}
            setSelectedOption={setItem}
          />
        )}

        <h3 className="add__data__label">Choose ingredients</h3>

        {isPending ? (
          <div>Loading..</div>
        ) : (
          <Select
            className="add__data__select"
            onChange={handleChangeIngredients}
            isMulti
            name="ingredients"
            options={trimmedArrayIngredients}
            styles={customSelectStyles}
            classNamePrefix="select"
            placeholder="Select ingredients for this item"
          />
        )}

        <button className="add__data__btn" onClick={handleSubmit} type="button">
          {pendingUpdateItems ? 'Loading' : 'Submit'}
        </button>
      </div>
    </>
  );
};

export default AddIngredientsToItem;
