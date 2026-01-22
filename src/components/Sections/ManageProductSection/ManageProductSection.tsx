import AddNewProduct from '../../AddNewProduct/AddNewProduct';
// import DeleteProduct from '../../DeleteProduct/DeleteProduct';
import DeleteUnit from '../../DeleteUnit/DeleteUnit';
// import { useAllItems, useDeleteItem } from '../../../hooks/useItems';
import { useAllProducts, useDeleteProduct } from '../../../hooks/useProducts';

const ManageProductSection = () => {
  const { data: allProducts, isPending } = useAllProducts();
  const { mutate, isPending: pendingDelete } = useDeleteProduct();
  return (
    <div>
      <h2>Manage Product Section</h2>

      <AddNewProduct />

      {/* <DeleteProduct /> */}

      {allProducts && (
        <DeleteUnit
          title="Delete Products"
          allItems={allProducts}
          isPending={isPending}
          mutate={mutate}
          pendingDelete={pendingDelete}
        />
      )}
    </div>
  );
};

export default ManageProductSection;
