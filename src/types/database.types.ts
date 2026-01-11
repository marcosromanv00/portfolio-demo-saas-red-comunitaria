// Database types for Supabase tables
export interface Database {
  public: {
    Tables: {
      community_requests: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          location: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          location: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          location?: string;
          status?: string;
          created_at?: string;
        };
      };
    };
  };
}

// Type for a single request row
export type Request = Database["public"]["Tables"]["community_requests"]["Row"];

// Type for inserting a new request
export type NewRequest =
  Database["public"]["Tables"]["community_requests"]["Insert"];

// Type for updating a request
export type UpdateRequest =
  Database["public"]["Tables"]["community_requests"]["Update"];
