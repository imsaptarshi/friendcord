import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { User } from "../providers/User.provider";
import discordApi from "../utils/discord.api";
import { supabase } from "../utils/supabase";

export default function ContextWrapper({ children }: any) {
  const { user, setUser } = User();

  const getUser = async () => {
    const res = await discordApi.get("/api/user/me", {
      headers: { allCookies: String(document.cookie) },
    });
    return res;
  };

  const authorizeUser = async () => {
    try {
      let _user = await getUser();
      _user = _user.data;

      //await getUser(_user?.user_metadata.sub);
      if (_user) {
        setUser({
          uid: _user?.data.discord,
          avatar: _user?.data.image,
          name: _user?.data.username,
          email: "",
          username: _user?.data.username.substring(
            0,
            _user?.data.username.lastIndexOf("#")
          ),
          discriminator: "",
          disliked: _user?.data.disliked || [],
          liked: _user?.data.liked || [],
          guilds: [],
          interests: _user?.data.interests || [],
        });
      }
    } catch (e) {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
      console.log(e);
    }
  };

  useEffect(() => {
    authorizeUser();
  }, []);
  return <>{children}</>;
}
