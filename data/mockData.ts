
import { Supplier, Project, Employee, Vehicle } from '../types';

export const mockSuppliers: Supplier[] = [
  { id: 1, name: 'Innovate Solutions Ltd.', contactPerson: 'John Doe', email: 'john.d@innovate.com', phone: '123-456-7890', status: 'Active', productsServices: ['Cement', 'Steel Beams'], certification: 'Certified' },
  { id: 2, name: 'Quantum Supplies Co.', contactPerson: 'Jane Smith', email: 'jane.s@quantum.com', phone: '234-567-8901', status: 'Active', productsServices: ['Aggregates', 'Piping'], certification: 'Pending' },
  { id: 3, name: 'Apex Logistics', contactPerson: 'Peter Jones', email: 'peter.j@apex.com', phone: '345-678-9012', status: 'Inactive', productsServices: ['Heavy Machinery Transport'], certification: 'Certified' },
  { id: 4, name: 'Stellar Components', contactPerson: 'Mary Johnson', email: 'mary.j@stellar.com', phone: '456-789-0123', status: 'Active', productsServices: ['Electrical Wiring', 'HVAC Units'], certification: 'None' },
];

export const mockProjects: Project[] = [
  { id: 1, name: 'Phoenix Tower', client: 'Global Real Estate', location: 'Lusaka CBD', region: 'Lusaka', manager: 'Alice Williams', startDate: '2023-01-15', endDate: '2024-01-15', budget: 500000, status: 'Completed' },
  { id: 2, name: 'Titan Bridge', client: 'National Road Authority', location: 'Kafue River', region: 'Southern', manager: 'Bob Brown', startDate: '2023-06-01', endDate: '2024-06-01', budget: 1200000, status: 'On Track' },
  { id: 3, name: 'Nebula Shopping Mall', client: 'Urban Developers Inc.', location: 'Ndola City', region: 'Copperbelt', manager: 'Charlie Davis', startDate: '2023-09-20', endDate: '2024-03-20', budget: 750000, status: 'At Risk' },
  { id: 4, name: 'Orion Dam', client: 'ZESCO', location: 'Zambezi River', region: 'Southern', manager: 'Diana Miller', startDate: '2024-02-10', endDate: '2024-12-31', budget: 2500000, status: 'On Track' },
  { id: 5, name: 'Gamma Warehouses', client: 'Apex Logistics', location: 'Kitwe Industrial', region: 'Copperbelt', manager: 'Eve Wilson', startDate: '2024-04-01', endDate: '2024-08-01', budget: 300000, status: 'On Hold' },
];

export const mockEmployees: Employee[] = [
  { id: 101, name: 'Frank White', email: 'frank.w@saric.com', role: 'Project Manager', department: 'Engineering', hireDate: '2020-05-12', assignedProject: 'Titan Bridge' },
  { id: 102, name: 'Grace Green', email: 'grace.g@saric.com', role: 'Lead Surveyor', department: 'Surveying', hireDate: '2019-11-20', assignedProject: 'Orion Dam' },
  { id: 103, name: 'Henry Black', email: 'henry.b@saric.com', role: 'Civil Engineer', department: 'Engineering', hireDate: '2021-02-18', assignedProject: 'Phoenix Tower' },
  { id: 104, name: 'Ivy Blue', email: 'ivy.b@saric.com', role: 'GIS Specialist', department: 'Surveying', hireDate: '2022-07-01', assignedProject: 'Nebula Shopping Mall' },
];

export const mockFleet: Vehicle[] = [
  { id: 'V-1001', type: 'Dump Truck', plate: 'ABC 1234', driver: 'Thomas M.', owner: 'SARIC', status: 'In Transit', location: 'Great North Rd, Lusaka', destination: 'Phoenix Tower', eta: '45 mins', fuelLevel: 78, healthStatus: 'Good' },
  { id: 'V-1004', type: 'Excavator Loader', plate: 'EXT 5500', driver: 'Samuel K.', owner: 'SARIC', status: 'Maintenance', location: 'Central Workshop', destination: 'N/A', eta: 'N/A', fuelLevel: 20, healthStatus: 'Warning' },
  { id: 'V-2022', type: 'Flatbed Truck', plate: 'XYZ 9876', driver: 'Joseph L.', owner: 'Outsourced', status: 'Loading', location: 'Ndola Warehouse', destination: 'Nebula Mall', eta: '4 hours', fuelLevel: 95, healthStatus: 'Good' },
  { id: 'V-2025', type: 'Cement Mixer', plate: 'CEM 3321', driver: 'Patrick Z.', owner: 'SARIC', status: 'Idle', location: 'Kafue Site', destination: 'N/A', eta: 'N/A', fuelLevel: 60, healthStatus: 'Good' },
  { id: 'V-3001', type: 'Crane Truck', plate: 'CRN 7744', driver: 'Michael B.', owner: 'Outsourced', status: 'In Transit', location: 'Livingstone Rd', destination: 'Orion Dam', eta: '2 hours', fuelLevel: 45, healthStatus: 'Critical' },
];
