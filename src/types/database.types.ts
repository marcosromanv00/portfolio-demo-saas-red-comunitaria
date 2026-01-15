export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      community_requests: {
        Row: {
          id: string;
          name: string;
          description: string;
          category: string;
          location: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          category: string;
          location: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          category?: string;
          location?: string;
          status?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
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
