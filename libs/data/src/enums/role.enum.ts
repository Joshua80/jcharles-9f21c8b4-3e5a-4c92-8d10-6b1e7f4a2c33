export enum RoleType {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
}

// Role hierarchy for inheritance
export const ROLE_HIERARCHY: Record<RoleType, RoleType[]> = {
  [RoleType.OWNER]: [RoleType.OWNER, RoleType.ADMIN, RoleType.VIEWER],
  [RoleType.ADMIN]: [RoleType.ADMIN, RoleType.VIEWER],
  [RoleType.VIEWER]: [RoleType.VIEWER],
};

/**
 * Check if a role has permission (with inheritance)
 * @param userRole - The user's role
 * @param requiredRoles - Array of roles that can access the resource
 * @returns true if user has permission
 */
export function hasRolePermission(
  userRole: RoleType,
  requiredRoles: RoleType[],
): boolean {
  const userPermissions = ROLE_HIERARCHY[userRole] || [];
  return requiredRoles.some((role) => userPermissions.includes(role));
}
