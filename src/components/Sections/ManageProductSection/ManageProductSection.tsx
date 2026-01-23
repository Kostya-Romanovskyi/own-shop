// import DeleteProduct from '../../DeleteProduct/DeleteProduct';
import DeleteUnit from '../../DeleteUnit/DeleteUnit';
import { IAddNewProduct } from '../../../API/products/products.interface';
// import { useAllItems, useDeleteItem } from '../../../hooks/useItems';
import { useAddNewProduct, useAllProducts, useDeleteProduct } from '../../../hooks/useProducts';
import AdminAddData from '../../AdminAddData/AdminAddData';
import { useAllCategories } from '../../../hooks/useAllCategories';
import { itemFields } from '../../../constants/AdminAddItemsArr';

const ManageProductSection = () => {
  const { data: allCategories } = useAllCategories();
  const { data: allProducts, isPending } = useAllProducts();
  const { mutate: addProduct, isPending: pendingAddProduct } = useAddNewProduct();
  const { mutate, isPending: pendingDelete } = useDeleteProduct();

  const categoriesData =
    (allCategories &&
      allCategories?.map(({ id, name }) => ({ value: id.toString(), label: name }))) ||
    [];

  return (
    <div>
      <h2 className="manage__title">Manage Product Section</h2>

      {/* <AddNewProduct /> */}

      <AdminAddData
        render={itemFields.product}
        mutate={formData => {
          addProduct(formData as unknown as IAddNewProduct);
        }}
        selectOptions={categoriesData}
        title={'Add Product'}
        isPending={pendingAddProduct}
      />

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
