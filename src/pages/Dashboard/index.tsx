import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, FolderOpen, Tag, Package, AlertTriangle, Users } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from './useDashboard';
import StatsCard from './StatsCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { dashboardData, isLoading } = useDashboard();

  if (!currentUser) return null;

  const dashboardCards = [
    {
      title: 'Usuarios',
      icon: <Users />,
      color: 'indigo' as const,
      route: ROUTES.USERS,
      data: dashboardData?.users,
    },
    {
      title: 'Ingredientes',
      icon: <Package />,
      color: 'purple' as const,
      route: ROUTES.INGREDIENTS,
      data: dashboardData?.ingredients,
    },
    {
      title: 'Alérgenos',
      icon: <AlertTriangle />,
      color: 'red' as const,
      route: ROUTES.ALLERGENS,
      data: dashboardData?.allergens,
    },
    {
      title: 'Platos',
      icon: <UtensilsCrossed />,
      color: 'blue' as const,
      route: ROUTES.DISHES,
      data: dashboardData?.dishes,
    },
    {
      title: 'Categorías',
      icon: <FolderOpen />,
      color: 'green' as const,
      route: ROUTES.CATEGORIES,
      data: dashboardData?.categories,
    },
    {
      title: 'Subcategorías',
      icon: <Tag />,
      color: 'yellow' as const,
      route: ROUTES.SUBCATEGORIES,
      data: dashboardData?.subcategories,
    },
  ];

  const handleCardClick = (route: string) => navigate(route);

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Bienvenido, {currentUser?.firstName}
            </h1>
            <p className="text-gray-600 mt-1">
              Acá podés ver un resumen general del restaurante. Clickeá en una tarjeta para ver más
              detalles.
            </p>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
              </div>
              <div className="mb-6">
                <div className="h-10 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="flex justify-between border-t pt-3">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {dashboardData && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map(card => (
            <StatsCard
              key={card.title}
              title={card.title}
              icon={card.icon}
              total={card.data?.total || 0}
              active={card.data?.active || 0}
              deleted={card.data?.deleted || 0}
              color={card.color}
              onClick={() => handleCardClick(card.route)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
