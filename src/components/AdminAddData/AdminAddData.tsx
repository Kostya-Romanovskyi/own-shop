import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import SelectComponent from '../SelectComponent/SelectComponent';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';

import './AdminAddData.scss';

interface AdminAddDataProps {
  render: {
    name: string;
    label: string;
    type: string;
    placeholder?: string | '';
    options?: { value: string; label: string }[];
  }[];
  mutate: (data: FormData) => void;
  selectOptions?: { value: string; label: string }[];
  title: string;
  isPending?: boolean;
}

interface FormValues {
  [key: string]: string | File | FileList | undefined;
  file?: FileList;
  image?: File;
}

const AdminAddData = ({ render, mutate, selectOptions, title, isPending }: AdminAddDataProps) => {
  const [selectedOption, setSelectedOption] = useState<
    Record<string, { value: string; label: string }>
  >({});

  useEffect(() => {
    const initial: Record<string, { value: string; label: string }> = {};
    render.forEach(item => {
      if (item.type === 'select') {
        const options = item.options || selectOptions || [];
        initial[item.name] = options[0] || { value: '', label: '' };
      }
    });
    setSelectedOption(initial);
  }, [render, selectOptions]);

  const { register, handleSubmit, control } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (!value) return;

      // file input
      if (value instanceof FileList) {
        formData.append('image', value[0]);
        return;
      }

      // text fields
      formData.append(key, String(value));
    });

    console.log(Array.from(formData.entries()));
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add__data__container">
      <h2 className="add__data__title">{title}</h2>
      {render.map(item => {
        if (item.type === 'select') {
          return (
            <div key={item.name} className="add__data__select">
              <label>{item.label}</label>

              <Controller
                name={item.name}
                control={control}
                render={({ field }) => (
                  <SelectComponent
                    options={item.options || selectOptions || []}
                    selectedOption={selectedOption[item.name] || { value: '', label: '' }}
                    setSelectedOption={option => {
                      // update UI
                      setSelectedOption(prev => ({ ...prev, [item.name]: option }));
                      // update form
                      field.onChange(option.value);
                    }}
                  />
                )}
              />
            </div>
          );
        }

        return (
          <div key={item.name} className="add__data__item">
            <label htmlFor={item.name} className="add__data__label">
              {item.label}
            </label>
            <input
              className="add__data__input"
              id={item.name}
              type={item.type}
              placeholder={item.placeholder}
              {...register(item.name)}
              style={{ display: 'block' }}
            />
          </div>
        );
      })}

      <button className="add__data__btn" type="submit">
        {isPending ? <Spinner size={spinnerSize.sm} /> : 'Submit'}
      </button>
    </form>
  );
};

export default AdminAddData;

// <form onSubmit={handleSubmit(onSubmit)}>
//   {render &&
//     render.map(item => (
//       <div key={item.label}>
//         <label htmlFor={item.name}>{item.label}</label>
//         <input
//           {...register(item.name as keyof FormValues)}
//           name={item.name}
//           type={item.type}
//           id={item.name}
//           placeholder={item.placeholder}
//           style={{ display: 'block' }}
//         />
//       </div>
//     ))}

//   <button className="main-button" type="submit">
//     Submit
//   </button>
// </form>
