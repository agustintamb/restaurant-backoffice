import { useAuth } from '@/hooks/useAuth';
import AdminProfile from './AdminProfile';

const Profile = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="text-center py-10">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <AdminProfile />
    </div>
  );
};

export default Profile;
