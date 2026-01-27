import sushi1 from '../../../assets/Info__section/info_sushi.jpg';
import sushi2 from '../../../assets/Info__section/info_sushi2.jpeg';

import './InfoSection.scss';

const InfoSection = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="info__title"> Our Restaurant’s Philosophy</h2>

        <ul className="info__list">
          <li className="info__item">
            <div>
              <h3 className="info__subtitle">The art of taste.</h3>
              <p className="info__text">
                Inspired by centuries-old Japanese culture, we create dishes that embody the spirit
                of omotenashi – the art of hospitality. Our menu features only fresh and natural
                ingredients, prepared with the philosophy of wabi-sabi, where simplicity enhances
                the true essence of flavors. We honor traditional recipes while embracing
                innovation, offering modern interpretations of classic Japanese dishes.
              </p>
            </div>
          </li>

          <li className="info__item">
            <img className="info__img" src={sushi1} alt="Japanese food for Philosophy section 1" />
          </li>

          <li className="info__item">
            <div>
              <h3 className="info__subtitle">Elegance in Every Bite</h3>
              <p className="info__text">
                Japanese cuisine is a delicate balance of flavor, texture, and presentation. Every
                ingredient is carefully selected and thoughtfully arranged to create a visual and
                culinary experience. Our dishes are not just meals – they are expressions of
                Japanese aesthetics, where every detail matters.
              </p>
            </div>
          </li>
          <li className="info__item">
            <div>
              <h3 className="info__subtitle">The Philosophy of Japanese Dining</h3>
              <p className="info__text">
                In Japan, every meal is a harmony of taste and form. Ingredients are chosen with
                care, textures balanced, and presentation refined, creating a dining experience that
                delights both the eyes and the palate.
              </p>
            </div>
          </li>

          <li className="info__item info__img-grid">
            <img className="info__img" src={sushi2} alt="Japanese food for Philosophy section 2" />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default InfoSection;
