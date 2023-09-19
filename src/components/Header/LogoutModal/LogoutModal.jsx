import { NavLink } from 'react-router-dom';
import css from './LogoutModal.module.css';
import logout from '../../../assets/logout.svg';
import settings from '../../../assets/setting.svg';
import { useDispatch } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';

function LogoutModal() {
  const dispatch = useDispatch();

  return (
    <div className={css.logout}>
      <NavLink className={css.user_link} to="/settings">
        <img src={settings} alt="settings" />
        <p className={css.link}>Setting</p>
      </NavLink>
      <NavLink
        className={css.user_link}
        to="/"
        onClick={() => {
          console.log('click on logout');
          dispatch(authOperations.logOut());
        }}
      >
        <img src={logout} alt="logout" />
        <p className={css.link}>Log out</p>
      </NavLink>
    </div>
  );
}

export default LogoutModal;
