export class Api {
  public API = {
    AUTH: {
      LOGIN: 'auth/login',
      // CHANGE_USER_PASSWORD: 'v1/user/change-password',
    },
    TASK: {
      LIST: 'tasks',
      VIEW: 'tasks',
      ADD_EDIT: 'tasks',
      DELETE: 'tasks',
      REORDER: 'tasks/reorder',
    },
    USER: {
      LIST: 'users/assign-list',
    },
    AUDIT_LOGS: {
      LIST: 'audit-log',
    },
  };
}
