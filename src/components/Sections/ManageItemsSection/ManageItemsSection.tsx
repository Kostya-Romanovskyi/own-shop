import AddIngredientsToItem from '../../AddIngredientsToItem/AddIngredientsToItem';
import AddNewItem from '../../AddNewItem/AddNewItem';
// import DeleteItem from '../../DeleteItem/DeleteItem';
import DeleteUnit from '../../DeleteUnit/DeleteUnit';
import { useAllItems, useAddNewItem, useDeleteItem } from '../../../hooks/useItems';
import AdminAddData from '../../AdminAddData/AdminAddData';
import { itemFields } from '../../../constants/AdminAddItemsArr';
import { IAddNewItem } from '../../../API/item/item.interface';
import { useAllProducts } from '../../../hooks/useProducts';

const ManageItemsSection = () => {
  // add items
  const { mutate: addItem, isPending: pendingAddItem } = useAddNewItem();
  const { data: allProducts } = useAllProducts();

  // delete items
  const { data: allItems, isPending } = useAllItems();
  const { mutate: deleteMutate, isPending: pendingDelete } = useDeleteItem();

  const optionData =
    allProducts?.map(({ id, name }) => ({ value: id.toString(), label: name })) || [];
  return (
    <div>
      <AddNewItem />

      <AdminAddData
        render={itemFields.item}
        mutate={formData => {
          addItem(formData as unknown as IAddNewItem);
        }}
        title={'Add new item'}
        selectOptions={optionData}
        isPending={pendingAddItem}
      />

      <AddIngredientsToItem />

      {/* <DeleteItem /> */}

      {allItems && (
        <DeleteUnit
          title="Delete items"
          allItems={allItems}
          isPending={isPending}
          mutate={deleteMutate}
          pendingDelete={pendingDelete}
        />
      )}
    </div>
  );
};

export default ManageItemsSection;
