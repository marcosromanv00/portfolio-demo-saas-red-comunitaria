// Database types for Supabase tables
export interface Database {
  public: {
    Tables: {
      requests: {
        Row: {
          id: string;
          title: string;
          description: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          status?: string;
          created_at?: string;
        };
      };
    };
  };
}

// Type for a single request row
export type Request = Database["public"]["Tables"]["requests"]["Row"];

// Type for inserting a new request
export type NewRequest = Database["public"]["Tables"]["requests"]["Insert"];

// Type for updating a request
export type UpdateRequest = Database["public"]["Tables"]["requests"]["Update"];
