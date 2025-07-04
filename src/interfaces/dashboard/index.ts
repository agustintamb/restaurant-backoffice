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
  contacts: {
    active: number;
    deleted: number;
    read: number;
    total: number;
    unread: number;
  };
}

export interface IDashboardStatsResponse {
  message: string;
  result: IDashboardStats;
}
