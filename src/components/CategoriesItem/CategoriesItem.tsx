import { FC } from 'react';
import './categories-item.scss';
import { Link, useParams } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';

interface ICategoriesItemProps {
  name: string;
  description: string;
  image: string;
}

const CategoriesItem: FC<ICategoriesItemProps> = ({ name, description, image }) => {
  const { categoryName } = useParams();

  return (
    <Link
      to={`/menu/categories/${categoryName}/${name.toLowerCase().replace('-', ' ')}`}
      className="categories__link"
    >
      <li className="categories__item">
        <img className="categories__item-image" src={image} alt={name} />
        <div className="categories__item-title-wrapper">
          <h3 className="categories__item-title">{name}</h3>
          <IoArrowForward className="categories__item-icon" />
        </div>

        <p className="categories__item-description">{description}</p>
      </li>
    </Link>
  );
};

export default CategoriesItem;
