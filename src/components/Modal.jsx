import React, { useState } from 'react';

const Modal = ({ active, setActive, children }) => {
  const [stateInput, setStateInput] = useState({
    userName: '',
    userNumber: '',
    userNameFocus: false,
    userNumberFocus: false,
  });
  const [nameError, setNameError] = useState('');
  const [numberError, setNumberError] = useState('');

  const { userName, userNumber } = stateInput;

  const handleChange = e => {
    const { name, value } = e.target;

    setStateInput({
      ...stateInput,
      [name]: value,
    });

    switch (e.target.name) {
      case 'userName':
        setNameError('');
        break;
      case 'userNumber':
        setNumberError('');
        break;
    }
  };

  const handleClose = () => {
    setActive(false);

    setStateInput({
      userName: '',
      userNumber: '',
    });

    setNameError('');
    setNumberError('');
  };

  const blurHandler = e => {
    switch (e.target.name) {
      case 'userName':
        setStateInput({
          ...stateInput,
          userNameFocus: true,
        });

        if (/[^a-z]/i.test(e.target.value)) {
          setNameError('Only letters allowed');
        } else if (e.target.value === '') {
          setNameError('This field in required');
        } else {
          setNameError('');
        }
        break;

      case 'userNumber':
        setStateInput({
          ...stateInput,
          userNumberFocus: true,
        });

        if (!/^-?\d*\.?\d*$/.test(e.target.value)) {
          setNumberError('Only numbers allowed');
        } else if (e.target.value === '') {
          setNumberError('This field in required');
        } else if (e.target.value.length !== 12) {
          setNumberError('Should contain 12 characters');
        } else {
          setNumberError('');
        }
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const userData = {
      name: stateInput.userName,
      number: stateInput.userNumber,
    };

    if (userName.length === 0) {
      setNameError('This field in required');
    }

    if (userNumber.length === 0) {
      setNumberError('This field in required');
    }

    if (userNumber.length && userName.length > 0 && !nameError && !numberError) {
      console.log(userData);
      handleClose();
    }
  };

  return (
    <div className={active ? 'modal active' : 'modal'}>
      <div className={active ? 'modal__content active' : 'modal__content'}>
        <div className="modal__btn" onClick={handleClose}>
          x
        </div>
        {children}

        <form className="user-info choosenCard" onSubmit={handleSubmit}>
          <input
            className={nameError ? 'user-info__input-error user-info__input' : 'user-info__input'}
            type="text"
            name="userName"
            placeholder="Name"
            value={userName}
            onChange={handleChange}
            onBlur={e => blurHandler(e)}
          />

          {nameError && (
            <div className="user-info__error user-info__error-name">
              {nameError}
              <i className="fas fa-times-circle error-icon__name"></i>
            </div>
          )}

          <input
            className={numberError ? 'user-info__input-error user-info__input' : 'user-info__input'}
            type="text"
            name="userNumber"
            placeholder="Number"
            value={userNumber}
            onChange={handleChange}
            onBlur={e => blurHandler(e)}
          />

          {numberError && (
            <div className="user-info__error">
              {numberError}
              <i className="fas fa-times-circle error-icon__number"></i>
            </div>
          )}

          <button className="user-info__btn" type="submit">
            ORDER
            <i className="fas fa-arrow-right user-info__btn-arrow"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
