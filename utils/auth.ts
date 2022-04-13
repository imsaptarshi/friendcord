import { supabase } from "./supabase"

export async function signInWithDiscord() {

    const { user, session, error } = await supabase.auth.signIn({
        provider: 'discord',

    }, {
        redirectTo: "http://localhost:3000/almost_there"
    })

}

export async function signout() {
    const { error } = await supabase.auth.signOut()
}