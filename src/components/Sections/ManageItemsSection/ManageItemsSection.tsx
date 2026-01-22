import AddIngredientsToItem from '../../AddIngredientsToItem/AddIngredientsToItem';
import AddNewItem from '../../AddNewItem/AddNewItem';
// import DeleteItem from '../../DeleteItem/DeleteItem';
import DeleteUnit from '../../DeleteUnit/DeleteUnit';
import { useAllItems, useDeleteItem } from '../../../hooks/useItems';

const ManageItemsSection = () => {
  const { data: allItems, isPending } = useAllItems();
  const { mutate, isPending: pendingDelete } = useDeleteItem();

  return (
    <div>
      <AddNewItem />

      <AddIngredientsToItem />

      {/* <DeleteItem /> */}

      {allItems && (
        <DeleteUnit
          title="Delete items"
          allItems={allItems}
          isPending={isPending}
          mutate={mutate}
          pendingDelete={pendingDelete}
        />
      )}
    </div>
  );
};

export default ManageItemsSection;
