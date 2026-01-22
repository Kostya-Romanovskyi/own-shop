import { useForm, SubmitHandler } from 'react-hook-form';
import InputString from '../../InputString/InputString';
import { IAddNewCategory } from '../../../API/categories/categories.interface';
import { useAddNewCategory } from '../../../hooks/useAllCategories';
// import DeleteCategories from '../../DeleteCategories/DeleteCategories';
import DeleteUnit from '../../DeleteUnit/DeleteUnit';
import { useAllCategories, useDeleteCategory } from '../../../hooks/useAllCategories';

import '../../../pages/Admin/admin.scss';

const ManageCategorySection = () => {
  const { register, handleSubmit } = useForm<IAddNewCategory>();
  const { mutate } = useAddNewCategory();

  const { data: allCategories, isPending } = useAllCategories();
  const { mutate: deleteMutate, isPending: pendingDelete } = useDeleteCategory();

  const onSubmit: SubmitHandler<IAddNewCategory> = data => {
    const formData = new FormData() as never as IAddNewCategory;

    formData['name'] = data.name;
    formData['description'] = data.description;

    if (data.image instanceof FileList) {
      formData['image'] = data.image[0];
    }

    mutate({ ...formData });
  };

  return (
    <div>
      <h2 className="manage__title">Manage Category</h2>

      <div className="manage__unit">
        <h3 className="manage__unit__title">Add new category</h3>
        <form className="manage__container" onSubmit={handleSubmit(onSubmit)}>
          <InputString
            label="Name of category"
            name="name"
            defaultValue=""
            type="string"
            register={register}
            placeholder="name"
          />

          <InputString
            label="Description of category"
            name="description"
            defaultValue=""
            type="string"
            register={register}
            placeholder="description"
          />

          <input
            style={{ display: 'block', marginBottom: 20 }}
            type="file"
            {...register('image', { required: true })}
          />

          <button className="main-button" type="submit">
            Submit
          </button>
        </form>
      </div>

      {/* <DeleteCategories /> */}

      {allCategories && (
        <DeleteUnit
          title="Delete Categories"
          allItems={allCategories}
          isPending={isPending}
          mutate={deleteMutate}
          pendingDelete={pendingDelete}
        />
      )}
    </div>
  );
};

export default ManageCategorySection;
