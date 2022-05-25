import { supabase } from "../utils/supabaseClient";

export async function increment_searches_count(song_id){
let { error } = await supabase
  .rpc('increment_searches_count', {
    song_id_input: song_id
  })

if (error) console.error(error)

}


