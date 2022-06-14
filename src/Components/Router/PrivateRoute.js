import { useUserContext } from '../../Context/UserContext';
import { Code404 } from '../Views/Errors/Code404'
import { Code403 } from '../Views/Errors/Code403'

const PrivateRoute = ({ role, children }) => {
  const { user } = useUserContext();
  if(!user || user.role !== role) return <Code403></Code403>;
  
  return children;
}

export default PrivateRoute;

//<p> 404 Not found </p>