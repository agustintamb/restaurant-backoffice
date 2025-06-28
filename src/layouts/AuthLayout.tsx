import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Fondo de imagen con overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://wallpapercat.com/w/full/4/b/4/584703-3840x2160-desktop-4k-cafe-wallpaper-photo.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>

      {/* Card principal */}
      <div className="relative z-10 max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-2xl px-8 py-10 backdrop-blur-sm border border-gray-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4"></div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 text-sm">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
