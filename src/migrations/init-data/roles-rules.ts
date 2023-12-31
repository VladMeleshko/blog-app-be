export const roles = [
  {
    title: 'Admin',
    value: 'ADMIN',
    description:
      'Global admin user who has full access to all modules of the functionality. Provider of the application service'
  },
  {
    title: 'VIP',
    value: 'VIP',
    description: 'User who has extended access rights'
  },
  {
    title: 'User',
    value: 'USER',
    description: 'Default user to use in system as customer/provider'
  }
];

export const userStatuses = [
  {title: 'Active', value: 'active', description: ''},
  {title: 'Inactive', value: 'inactive', description: ''},
  {title: 'Deleted', value: 'deleted', description: ''}
];

export const userRolesRules = [
  {
    title: 'Create User',
    value: 'CREATE_USER',
    description: 'Can create a user'
  },
  {
    title: 'Read User',
    value: 'READ_USER',
    description: 'Can read a user'
  },
  {
    title: 'Update User',
    value: 'UPDATE_USER',
    description: 'Can update a user'
  },
  {
    title: 'Delete User',
    value: 'DELETE_USER',
    description: 'Can delete a user'
  },
  {
    title: 'List Users',
    value: 'LIST_USERS',
    description: 'Can list all users'
  }
];
const adminCrud = [
  'CREATE_USER',
  'READ_USER',
  'UPDATE_USER',
  'DELETE_USER',
  'LIST_USERS'
];

export const rolesRules = {
  ADMIN: [...adminCrud],
  VIP: [],
  USER: []
};
