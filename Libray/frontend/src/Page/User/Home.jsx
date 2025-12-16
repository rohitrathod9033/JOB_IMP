import { useEffect, useState } from 'react';
import AdminPreview from '../Admin/AdminPreview';
import UserPreview from './UserPreview';
import DefaultHome from '../../Components/DefaultHome';

const Home = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const updateRole = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("roleChanged", updateRole);
    updateRole();
    return () => window.removeEventListener("roleChanged", updateRole);
  }, []);

  if (!role) {
    return <DefaultHome />;
  }

  return (
    <>
      {role === "admin" ? <AdminPreview /> : <UserPreview />}
    </>

  );
}

export default Home;
