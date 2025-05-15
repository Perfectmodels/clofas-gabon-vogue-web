export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string | null
          newsletter_opt_in: boolean
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name?: string | null
          newsletter_opt_in?: boolean
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string | null
          newsletter_opt_in?: boolean
          subject?: string | null
        }
        Relationships: []
      }
      event_stylists: {
        Row: {
          created_at: string
          event_id: string
          id: string
          stylist_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          stylist_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          stylist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_stylists_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_stylists_stylist_id_fkey"
            columns: ["stylist_id"]
            isOneToOne: false
            referencedRelation: "stylists"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          edition: number
          end_date: string
          id: string
          location: string
          start_date: string
          title: string
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          edition: number
          end_date: string
          id?: string
          location: string
          start_date: string
          title: string
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          description?: string | null
          edition?: number
          end_date?: string
          id?: string
          location?: string
          start_date?: string
          title?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          created_at: string
          description: string | null
          event_id: string | null
          id: string
          image_url: string
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_id?: string | null
          id?: string
          image_url: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_id?: string | null
          id?: string
          image_url?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          country: string | null
          created_at: string
          first_name: string | null
          id: string
          is_admin: boolean
          last_name: string | null
          phone_number: string | null
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          is_admin?: boolean
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          is_admin?: boolean
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      programs: {
        Row: {
          created_at: string
          description: string | null
          end_datetime: string
          event_id: string
          id: string
          location: string | null
          start_datetime: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_datetime: string
          event_id: string
          id?: string
          location?: string | null
          start_datetime: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_datetime?: string
          event_id?: string
          id?: string
          location?: string | null
          start_datetime?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "programs_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      stylists: {
        Row: {
          bio: string | null
          contact_info: string | null
          country: string | null
          created_at: string
          id: string
          name: string
          profile_image: string | null
          social_media: Json | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          contact_info?: string | null
          country?: string | null
          created_at?: string
          id?: string
          name: string
          profile_image?: string | null
          social_media?: Json | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          contact_info?: string | null
          country?: string | null
          created_at?: string
          id?: string
          name?: string
          profile_image?: string | null
          social_media?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      ticket_types: {
        Row: {
          created_at: string
          description: string | null
          event_id: string
          id: string
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_id: string
          id?: string
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_id?: string
          id?: string
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_types_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
