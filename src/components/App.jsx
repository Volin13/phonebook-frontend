import { Route, Routes } from 'react-router-dom';
import Phonebook from '../Pages/PhoneBook/PhoneBook';
import PrivateRoute from '../Routes/PrivateRoute';
import PublicRoute from '../Routes/PublicRoute';
import SharedLayout from './SharedLayout/SharedLayout';
import Login from '../Pages/LogIn/Login';
import Registration from '../Pages/Registration/Registration';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading } from '../selectors/selectors';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FallingLines } from 'react-loader-spinner';
import { refreshUser } from '../redux/registration/registrationAP';
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
} from '../redux/registration/registrationSelectors';

export const onSucsessMessage = message => toast.info(message);
export const onErrorMessage = message => toast.error(message);

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);
  const token = useSelector(selectToken);
  if (!isLoggedIn && token !== null) {
    dispatch(refreshUser());
  }
  return (
    <div className="container">
      {isRefreshing ? (
        <button>Load user data...</button>
      ) : (
        <Routes>
          <Route path="" element={<SharedLayout />}>
            <Route
              path="/registration"
              element={<PublicRoute component={<Registration />} />}
            />
            <Route
              path="/logIn"
              element={<PublicRoute component={<Login />} />}
            />
            <Route
              path="/phonebook"
              element={<PrivateRoute component={<Phonebook />} />}
            />
          </Route>
        </Routes>
      )}

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <FallingLines
            color="white"
            width="500"
            visible={true}
            ariaLabel="falling-lines-loading"
          />
        </div>
      )}
    </div>
  );
};

export default App;
