import { createContext, useState, useEffect, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react";
import { useRouter } from "next/router";
import { User } from "../interfaces/index";
import {loginUserAPI,} from "../services/call";

const AuthContext = createContext(null);
const AuthState = (props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>();
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(true);

  const [userInfo, setUserInfo] = useState<User>({
    _id: "",
    fullName: "",
    email: "",
    password:"",
  });

  const [profileId,setProfileId]=useState(undefined);

  const LoginToAccount = async (body: any) => {
    const [data, err] = await loginUserAPI(body);
    if (data?.success === true) {
      console.log("Succesfully Login user");
      setIsAuthenticated(true);
      setUserInfo(data?.data);
      console.log("Succesfully Login");
      profileId? router.push("/dashboard"): router.push("/home");
      return null;
    }
    
     else if (err)
      {
      console.log(err?.message);
      return err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        router,
        loading,
        setLoading,
        isAuthenticated,
        LoginToAccount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
export { AuthContext };
