export const itemFields = {
  category: [
    {
      name: 'name',
      label: 'Category name',
      type: 'text',
      placeholder: 'Enter category name',
    },
    {
      name: 'description',
      label: 'Category description',
      type: 'text',
      placeholder: 'Enter category description',
    },
    {
      name: 'file',
      label: 'Choose category image',
      type: 'file',
      placeholder: 'Choose category image',
    },
  ],
  product: [
    {
      name: 'category_id',
      label: 'Select category',
      type: 'select',
    },
    { name: 'name', label: 'Product name', type: 'text' },
    { name: 'description', label: 'Product description', type: 'text' },
    {
      name: 'file',
      label: 'Choose product image',
      type: 'file',
      placeholder: 'Choose product image',
    },
  ],
  item: [
    { name: 'name', label: 'Item name', type: 'text' },
    { name: 'description', label: 'Item description', type: 'text' },
    {
      name: 'file',
      label: 'Choose Item image',
      type: 'file',
      placeholder: 'Choose Item image',
    },
    { name: 'price', label: 'Item price', type: 'text' },
    {
      name: 'type',
      label: 'Select type',
      type: 'select',
      options: [
        { value: 'food', label: 'Food' },
        { value: 'staff', label: 'Staff' },
      ],
    },
    {
      name: 'products_id',
      label: 'Select product',
      type: 'select',
    },
  ],
  addIngredientsToItem: [
    {
      name: 'chooseItem',
      label: 'Choose item',
      type: 'select',
    },
    {
      name: 'chooseIngredients',
      label: 'Choose ingredients',
      type: 'select',
      useExtraOptions: true,
    },
  ],
};
