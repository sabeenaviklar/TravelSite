import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import DestinationsList from './features/destinations/DestinationsList';
import DestinationDetail from './features/destinations/DestinationDetail';
import HousesList from './features/houses/HousesList';
import Login from './features/auth/Login';
import SignUp from './features/auth/SignUp';
import BookingForm from './features/bookings/BookingForm';

const routes = [
  { path: '/', element: Home, isPrivate: false },
  { path: '/destinations', element: DestinationsList, isPrivate: false },
  { path: '/destinations/:id', element: DestinationDetail, isPrivate: false },
  { path: '/houses', element: HousesList, isPrivate: false },
  { path: '/booking/:destinationId', element: BookingForm, isPrivate: true },
  { path: '/about', element: About, isPrivate: false },
  { path: '/login', element: Login, isPrivate: false },
  { path: '/signup', element: SignUp, isPrivate: false },
  { path: '*', element: NotFound, isPrivate: false },
];

export default routes;
