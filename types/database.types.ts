export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      books: {
        Row: {
          author: string | null
          categories: string[] | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: number
          image_url: string | null
          number_pages: number | null
          score: number | null
          status: Database["public"]["Enums"]["status"] | null
          title: string | null
          type: Database["public"]["Enums"]["type"] | null
          user_id: string | null
        }
        Insert: {
          author?: string | null
          categories?: string[] | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          image_url?: string | null
          number_pages?: number | null
          score?: number | null
          status?: Database["public"]["Enums"]["status"] | null
          title?: string | null
          type?: Database["public"]["Enums"]["type"] | null
          user_id?: string | null
        }
        Update: {
          author?: string | null
          categories?: string[] | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          image_url?: string | null
          number_pages?: number | null
          score?: number | null
          status?: Database["public"]["Enums"]["status"] | null
          title?: string | null
          type?: Database["public"]["Enums"]["type"] | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          id: string
          image_url: string | null
          is_private: boolean
          username: string | null
        }
        Insert: {
          email?: string | null
          id: string
          image_url?: string | null
          is_private?: boolean
          username?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          image_url?: string | null
          is_private?: boolean
          username?: string | null
        }
        Relationships: []
      }
      reading_clubs: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          image: string | null
          is_private: boolean | null
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          is_private?: boolean | null
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          is_private?: boolean | null
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      reading_clubs_members: {
        Row: {
          club_id: number | null
          created_at: string | null
          id: number
          user_id: string
        }
        Insert: {
          club_id?: number | null
          created_at?: string | null
          id?: number
          user_id: string
        }
        Update: {
          club_id?: number | null
          created_at?: string | null
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_clubs_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "reading_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_clubs_members_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_clubs_messages: {
        Row: {
          club_id: number | null
          content: string
          created_at: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          club_id?: number | null
          content: string
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          club_id?: number | null
          content?: string
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reading_clubs_messages_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "reading_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_clubs_messages_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_top_categories: {
        Args: {
          limit_num?: number
        }
        Returns: {
          category: string
          count: number
        }[]
      }
      get_wrapped_top_categories: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: string
          count: number
        }[]
      }
      sync_existing_users_to_profiles: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      status: "reading" | "paused" | "finished"
      type: "paper" | "kindle"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

