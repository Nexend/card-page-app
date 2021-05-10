import React, { useState, useEffect } from 'react';
import { fetchProductsList } from './gateway/products';
import Card from './Card';
import Modal from './Modal';
import ChoosenCard from './ChoosenCard';

const App = () => {
  const [productsList, setProductsList] = useState([]);
  const [choosenProduct, setChoosenProduct] = useState(null);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    fetchProductsList().then(products => setProductsList(products));
  }, []);

  if (!productsList) {
    return null;
  }

  const handleGetCard = product => {
    setChoosenProduct(product);
  };

  const handlerCheapestCard = () => {
    setModalActive(true);

    const minPriceOfProduct = Math.min(...productsList.map(product => product.price));
    const cheapestProduct = productsList.find(product => product.price === minPriceOfProduct);
    setChoosenProduct(cheapestProduct);
  };

  return (
    <>
      {choosenProduct ? (
        <Modal active={modalActive} setActive={setModalActive}>
          <ChoosenCard
            name={choosenProduct.name}
            category={choosenProduct.category}
            price={choosenProduct.price}
          />
        </Modal>
      ) : null}

      <div className="page">
        <div className="container">
          <div className="cards">
            {productsList.map(product => (
              <Card
                key={product.name}
                {...product}
                setActive={setModalActive}
                getCard={handleGetCard}
              />
            ))}
          </div>
          <button className="cheapest-card__btn" onClick={handlerCheapestCard}>
            Buy cheapest
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
