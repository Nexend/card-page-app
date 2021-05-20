import React from 'react';

const ChoosenProduct = ({ name, category, price }) => {
  return (
    <div className="choosenCard">
      <div className="card__categories">{category}</div>
      <div className="card__name choosenCard__name">{name}</div>
      <div className="card-purchase__price">
        $<span>{price}</span>
      </div>
    </div>
  );
};

export default ChoosenProduct;
