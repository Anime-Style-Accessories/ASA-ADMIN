import { UserData } from '@/dto';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface IAuthContext {
  isAuthenticated: boolean;
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserData | null>(null);

  const value: IAuthContext = {
    isAuthenticated: !!user,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
