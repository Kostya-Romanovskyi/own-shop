import { FC } from 'react';
import './InfoItem.scss';

interface IInfoItemProps {
  title: string;
  image: string;
  alt: string;
}

const InfoItem: FC<IInfoItemProps> = ({ title, image, alt }) => {
  return (
    <div className="info__wrapper--item">
      <p className="info__description">{title}</p>
      <img className="info__img" src={image} alt={alt} />
    </div>
  );
};

export default InfoItem;
