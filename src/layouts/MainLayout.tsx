import { Outlet } from 'react-router-dom';
import Header from '@/layouts/components/Header';

const MainLayout = () => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <Header />
    <main className="flex-grow container mx-auto px-4 sm:px-6 py-6 pt-28">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
