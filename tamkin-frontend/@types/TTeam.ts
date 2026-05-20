export interface TTeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Editor' | 'Viewer';
  type: 'Employee' | 'Member';
  status: 'Active' | 'Inactive';
  joinedAt: string;
  permissions: string[];
}
