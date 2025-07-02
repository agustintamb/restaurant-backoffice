export interface IDashboardStats {
  dishes: {
    total: number;
    active: number;
    deleted: number;
  };
  categories: {
    total: number;
    active: number;
    deleted: number;
  };
  subcategories: {
    total: number;
    active: number;
    deleted: number;
  };
  ingredients: {
    total: number;
    active: number;
    deleted: number;
  };
  allergens: {
    total: number;
    active: number;
    deleted: number;
  };
  users: {
    total: number;
    active: number;
    deleted: number;
  };
}

export interface IDashboardStatsResponse {
  message: string;
  result: IDashboardStats;
}
