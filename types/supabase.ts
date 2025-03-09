export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          role: string
          email: string
          phone: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          role?: string
          email: string
          phone?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          role?: string
          email?: string
          phone?: string | null
        }
      }
      events: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string
          start_date: string
          end_date: string
          location: string
          price: number
          capacity: number
          organizer_id: string
          status: string
          image_url: string | null
          category: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description: string
          start_date: string
          end_date: string
          location: string
          price: number
          capacity: number
          organizer_id: string
          status?: string
          image_url?: string | null
          category: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          start_date?: string
          end_date?: string
          location?: string
          price?: number
          capacity?: number
          organizer_id?: string
          status?: string
          image_url?: string | null
          category?: string
        }
      }
      registrations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          event_id: string
          user_id: string
          status: string
          payment_id: string | null
          ticket_type: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          event_id: string
          user_id: string
          status?: string
          payment_id?: string | null
          ticket_type: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          event_id?: string
          user_id?: string
          status?: string
          payment_id?: string | null
          ticket_type?: string
        }
      }
      payments: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          amount: number
          status: string
          payment_method: string
          reference: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          amount: number
          status?: string
          payment_method: string
          reference: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          amount?: number
          status?: string
          payment_method?: string
          reference?: string
          metadata?: Json | null
        }
      }
      courses: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string
          instructor_id: string
          price: number
          duration: number
          start_date: string
          status: string
          image_url: string | null
          category: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description: string
          instructor_id: string
          price: number
          duration: number
          start_date: string
          status?: string
          image_url?: string | null
          category: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          instructor_id?: string
          price?: number
          duration?: number
          start_date?: string
          status?: string
          image_url?: string | null
          category?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          course_id: string
          user_id: string
          status: string
          payment_id: string | null
          progress: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          course_id: string
          user_id: string
          status?: string
          payment_id?: string | null
          progress?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          course_id?: string
          user_id?: string
          status?: string
          payment_id?: string | null
          progress?: number
        }
      }
      api_keys: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          key: string
          name: string
          expires_at: string | null
          last_used_at: string | null
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          key: string
          name: string
          expires_at?: string | null
          last_used_at?: string | null
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          key?: string
          name?: string
          expires_at?: string | null
          last_used_at?: string | null
          status?: string
        }
      }
      api_logs: {
        Row: {
          id: string
          created_at: string
          api_key_id: string
          endpoint: string
          method: string
          status_code: number
          response_time: number
          ip_address: string
          user_agent: string
        }
        Insert: {
          id?: string
          created_at?: string
          api_key_id: string
          endpoint: string
          method: string
          status_code: number
          response_time: number
          ip_address: string
          user_agent: string
        }
        Update: {
          id?: string
          created_at?: string
          api_key_id?: string
          endpoint?: string
          method?: string
          status_code?: number
          response_time?: number
          ip_address?: string
          user_agent?: string
        }
      }
      email_logs: {
        Row: {
          id: string
          created_at: string
          recipient: string
          subject: string
          template_id: string
          status: string
          error: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          recipient: string
          subject: string
          template_id: string
          status?: string
          error?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          recipient?: string
          subject?: string
          template_id?: string
          status?: string
          error?: string | null
          metadata?: Json | null
        }
      }
      email_templates: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          subject: string
          content: string
          type: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          subject: string
          content: string
          type: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          subject?: string
          content?: string
          type?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

