import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import useMediaQuery from 'helpers/useMediaQuery';
import authSelectors from 'redux/auth/auth-selectors';
import authOperations from 'redux/auth/auth-operations';
import close from '../../../assets/close-circle.svg';
import css from './WeightModal.module.css';

function WeightModal({ closeWeightModal, closeWeightMobileModal }) {
  const dispatch = useDispatch();
  const weightRef = useRef();
  const isMobile = useMediaQuery('(max-width:833px)');
  const {
    name,
    goal,
    gender,
    age,
    height,
    weight,
    activity,
    token,
    avatarURL,
  } = useSelector(authSelectors.getUser);

  function handleSubmit(evt) {
    evt.preventDefault();
    const value = weightRef.current.value;

    dispatch(
      authOperations.saveSettings2({
        token,
        goal,
        avatarURL,
        setting: {
          ...{ name, gender, age, height, weight, activity },
          weight: value,
        },
      })
    );
    isMobile ? closeWeightMobileModal() : closeWeightModal();
    const form = evt.target;
    form.reset();
  }
  let today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = dd + '.' + mm + '.' + yyyy;
  return (
    <div className={css.modal}>
      <div className={css.titles}>
        <h2 className={css.title}>Enter your current weight</h2>
        <p className={css.subtitle}>You can record your weight once a day</p>
      </div>
      <p className={css.today}>
        Today <span className={css.date}>{today}</span>
      </p>
      <form type="submit" onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          placeholder="Enter your weight"
          type="number"
          ref={weightRef}
          max={500}
          min={0}
        />
        <button className={css.button}>Confirm</button>
      </form>
      {isMobile ? (
        <button onClick={closeWeightMobileModal} className={css.close_mobile}>
          Cancel
        </button>
      ) : (
        <button onClick={closeWeightModal} className={css.close}>
          <img src={close} alt="close" />
        </button>
      )}
    </div>
  );
}
export default WeightModal;