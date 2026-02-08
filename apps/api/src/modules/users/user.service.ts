import { updateUserById } from './user.repository.js';

export const updateProfile = (userId: string, data: Record<string, unknown>) => {
  return updateUserById(userId, data);
};
