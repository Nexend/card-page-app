import React from 'react';

const Card = ({ name, category, price, setActive, getCard }) => {
  const handleChoosenProduct = () => {
    setActive(true);

    const choosenCard = {
      name,
      category,
      price,
    };

    getCard(choosenCard);
  };

  return (
    <div className="card">
      <div className="card__categories">{category}</div>
      <div className="card__name">{name}</div>
      <div className="card-purchase">
        <div className="card-purchase__price">
          $<span>{price}</span>
        </div>
        <button className="card-purchase__btn" onClick={handleChoosenProduct}>
          Buy
        </button>
      </div>
    </div>
  );
};

export default Card;
