import { redirect } from 'react-router-dom';

export const authLoader = async () => {
  if (localStorage.getItem('@AUTH_TOKEN_YC') == null) return redirect('/login');
  return null;
};
