import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { useAuth } from '@/hooks/useAuth';
import { IUpdateUserProfile } from '@/interfaces/user';
import { updateUserProfile } from '@/features/user/asyncActions';

interface IAdminProfileValues {
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
}

export const useProfile = () => {
  const dispatch: AppDispatch = useDispatch();

  const { currentUser, isLoading } = useAuth();

  const initialValues: IAdminProfileValues = {
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    phone: currentUser?.phone || '',
    username: currentUser?.username || '',
  };

  const handleUpdateProfile = async (values: IAdminProfileValues) => {
    const params: IUpdateUserProfile = {
      id: currentUser?._id || '',
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
    };

    dispatch(updateUserProfile(params));
  };

  return {
    initialValues,
    isLoading,
    handleUpdateProfile,
  };
};
