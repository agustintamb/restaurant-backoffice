import { AxiosResponse } from 'axios';
import ServiceBase from '@/service/ServiceBase';
import { IDashboardStatsResponse } from '@/interfaces/dashboard';

class DashboardService extends ServiceBase {
  getDashboardStats = () =>
    this.client.get<ResponseType, AxiosResponse<IDashboardStatsResponse>>('dashboard/stats');
}

export default new DashboardService();
