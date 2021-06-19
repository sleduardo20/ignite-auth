import Router from 'next/dist/client/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api } from 'services/apiClient';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextDate = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User | undefined;
};

const AuthContext = createContext({} as AuthContextDate);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function signOut() {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      api
        .get('/me')
        .then(response => {
          const { email, permissions, roles } = response.data;

          setUser({ email, permissions, roles });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post('sessions', { email, password });

      const { permissions, roles, token, refreshToken } = response.data;

      // Armazenar informações do navegador:
      // sessionStorage => os dados ficam salvos enquanto o browser estiver aberto
      // localStorage => no funciona somente no Client(browser), no Next.js tem o lado do servidor que não tem localStorage
      // cookies => pode ser acessado tanto pelo client quanto pelo servidor

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setUser({
        email,
        permissions,
        roles,
      });

      api.defaults.headers.Authorization = `Bearer ${token}`;

      Router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
