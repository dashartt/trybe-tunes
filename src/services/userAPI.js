const USER_KEY = 'user';

export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));
export const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const updateUser = (updatedUser) => saveUser({ ...updatedUser });
