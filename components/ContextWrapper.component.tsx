import { useEffect } from "react";
import { User } from "../providers/User.provider";
import discordApi from "../utils/discord.api";
import { supabase } from "../utils/supabase";

export default function ContextWrapper({ children }: any) {
  const { user, setUser } = User();

  const getUser = async () => {
    const res = await discordApi.get("/api/user/me", { withCredentials: true });
    console.log(res);
  };

  supabase.auth.onAuthStateChange(async () => {
    //authorizeUser()
  });

  const authorizeUser = async () => {
    await getUser();

    //const _user = await supabase.auth.user();
    //console.log(_user, user);
    //await getUser(_user?.user_metadata.sub);
    /*if (_user) {
      setUser({
        uid: _user?.user_metadata.sub || _user?.user_metadata.provider_id,
        avatar: _user?.user_metadata.avatar_url,
        name: _user?.user_metadata.name,
        email: _user?.user_metadata.email,
        username: _user?.user_metadata.full_name,
        discriminator: "",
        disliked: [],
        liked: [],
        guilds: [],
        interests: [],
      });*/
  };

  useEffect(() => {
    authorizeUser();
  }, []);
  return <>{children}</>;
}
