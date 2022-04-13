import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type User = {
  uid: string | Number;
  email: string;
  discriminator: string;
  username: string;
  name: string;
  avatar: string;
  guilds: Array<any>;
  interests: Array<any>;
  liked: Array<string | Number>;
  disliked: Array<string | Number>;
};
const UserContext = createContext<{
  user: User | undefined;
  setUser: (arg0: User) => void;
}>({
  user: {
    uid: "",
    email: "",
    name: "",
    discriminator: "",
    username: "",
    avatar: "",
    guilds: [],
    interests: [],
    liked: [],
    disliked: [],
  },
  setUser: ({}) => {},
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const User = () => useContext(UserContext);
