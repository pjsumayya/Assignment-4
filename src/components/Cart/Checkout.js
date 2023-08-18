import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;
const Checkout = (props) => {
  const [formInputsValidity,setFormInputsValidity] = useState({
    name:true,
    street:true,
    postal:true,
    city:true
  });
  const nameUserRef = useRef();
  const streetUserRef = useRef();
  const postalUserRef = useRef();
  const cityUserRef = useRef();
  
  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameUserRef.current.value;
    const enteredStreet = streetUserRef.current.value;
    const enteredPostal = postalUserRef.current.value;
    const enteredCity = cityUserRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        postal:enteredPostalIsValid,
        city:enteredCityIsValid
    })
    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;
  
    if(!formIsValid)
    {
        return;
    }
    
    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      postal:enteredPostal,
      city:enteredCity
    });
};

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameUserRef}/>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetUserRef}/>
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postal ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalUserRef}/>
        {!formInputsValidity.postal && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityUserRef}/>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;