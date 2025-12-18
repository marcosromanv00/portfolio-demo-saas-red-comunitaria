// services/requests.service.js
import { supabase } from "../supabaseClient";

export const RequestsService = {
  async getAll() {
    return supabase
      .from("community_requests")
      .select("*")
      .order("created_at", { ascending: false });
  },

  async getById(id) {
    return supabase
      .from("community_requests")
      .select("*")
      .eq("id", id)
      .single();
  },

  async create(payload) {
    return supabase.from("community_requests").insert([payload]);
  },

  async update(id, payload) {
    return supabase
      .from("community_requests")
      .update(payload)
      .eq("id", id);
  },

  async remove(id) {
    return supabase
      .from("community_requests")
      .delete()
      .eq("id", id);
  },
};
