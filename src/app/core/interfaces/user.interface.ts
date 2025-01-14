export interface User {
    _id: string;
    username: string;
    email: string;
    fullName?: string;
    status: string; // 'active', 'inactive', etc.
    equipmentIds?: string[];
  }
  