// src/services/requests.service.js

import { supabase } from "../supabaseClient";

/**
 * RequestsService
 *
 * Responsabilidad única:
 * - Gestionar TODAS las operaciones de datos
 *   relacionadas con community_requests
 *
 * La UI no debe conocer Supabase
 */
export const RequestsService = {
  /**
   * Obtener todas las solicitudes
   */
  async getAll() {
    return supabase
      .from("community_requests")
      .select("*")
      .order("created_at", { ascending: false });
  },

  /**
   * Obtener una solicitud por ID
   */
  async getById(id) {
    return supabase
      .from("community_requests")
      .select("*")
      .eq("id", id)
      .single();
  },

  /**
   * Crear nueva solicitud
   */
  async create(payload) {
    return supabase
      .from("community_requests")
      .insert([payload]);
  },

  /**
   * Actualizar solicitud existente
   */
  async update(id, payload) {
    return supabase
      .from("community_requests")
      .update(payload)
      .eq("id", id);
  },

  /**
   * Eliminar solicitud
   */
  async remove(id) {
    return supabase
      .from("community_requests")
      .delete()
      .eq("id", id);
  },
};
