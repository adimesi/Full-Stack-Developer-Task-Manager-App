import React,{createContext,useState,ReactNode,useEffect,useContext} from "react";
import{User,LoginCredentials,SignupCredentials} from "../types/user";
import{login as loginApi, signup as signupApi, logout as logoutApi,getCurrentUser} from "../services/auth";



type AuthContextType = {
    user: User | null;
    loading: boolean;
    error: string|null;
    login: (credentials: LoginCredentials) => Promise<void>;
    signup: (credentials: SignupCredentials) => Promise<void>;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    error: null,
    login: async () => {},
    signup: async () => {},
    logout: () => {},
});

type AuthProviderProps = {
    children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
   
    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
          setUser(user);
        }
        setLoading(false);
      }, []);
    const login = async (credentials: LoginCredentials) => {
        try {
            setLoading(true);
            setError(null);
            const response = await loginApi(credentials);
            setUser(response.user);
            
        } catch (error: any) {
            setError(error.response.data.message);
            throw error;
        }
        finally {
            setLoading(false);
        }
    };

    const signup = async (credentials: SignupCredentials) => {
        try {
            setLoading(true);
            setError(null);
            await signupApi(credentials);
        } catch (error: any) {
            setError(error.response.data.message);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }
    const logout = () => {
        logoutApi();
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user,loading,error,login,signup,logout}}>
            {children}  
        </AuthContext.Provider>

    )
    }


export const useAuth = () => {
    return useContext(AuthContext);

  };
  
  
  export default AuthContext