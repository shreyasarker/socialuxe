import {Navigate, useLocation} from 'react-router-dom';
import { fetchUser } from './utils/fetchUser';

const ProtectedRoute = ({children}) => {
    const user = fetchUser();
    let location = useLocation();

    if(!user) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children;

};

export default ProtectedRoute;