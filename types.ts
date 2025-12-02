
export enum Role {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  VIEWER = 'Viewer',
}

export interface User {
  name: string;
  role: Role;
}

export interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  productsServices: string[];
  certification: 'Certified' | 'Pending' | 'None';
  status: 'Active' | 'Inactive';
}

export interface Project {
  id: number;
  name: string;
  client: string;
  location: string;
  region: 'Lusaka' | 'Copperbelt' | 'Southern' | 'Other';
  manager: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'On Track' | 'At Risk' | 'Completed' | 'On Hold';
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  hireDate: string;
  assignedProject: string;
}

export interface Vehicle {
  id: string;
  type: string;
  plate: string;
  driver: string;
  owner: 'SARIC' | 'Outsourced';
  status: 'In Transit' | 'Idle' | 'Maintenance' | 'Loading';
  location: string;
  destination: string;
  eta: string;
  fuelLevel: number;
  healthStatus: 'Good' | 'Warning' | 'Critical';
}
