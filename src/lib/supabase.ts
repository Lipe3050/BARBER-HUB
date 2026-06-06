import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://omjmdyvzcdxoivublisq.supabase.co";
const supabaseKey = "sb_publishable_w3VClwaduy7eSI3gIuOsFg_ILuTaq0-";

export const supabase = createClient(supabaseUrl, supabaseKey);