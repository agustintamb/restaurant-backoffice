import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/layouts/components/Header';
import { useContacts } from '@/pages/Contacts/useContacts';
import { useEffect } from 'react';

const MainLayout = () => {
  const { pathname } = useLocation();
  const { refreshContacts, totalUnread } = useContacts();

  useEffect(() => {
    refreshContacts();
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header hasNewMessages={Boolean(totalUnread)} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-6 pt-28">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
