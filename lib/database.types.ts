export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          website: string | null
          company: string | null
          job_title: string | null
          bio: string | null
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          country: string | null
          postal_code: string | null
          email_preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          website?: string | null
          company?: string | null
          job_title?: string | null
          bio?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          postal_code?: string | null
          email_preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          website?: string | null
          company?: string | null
          job_title?: string | null
          bio?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          postal_code?: string | null
          email_preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          id: string
          name: string
          subject: string
          html_content: string
          text_content: string | null
          variables: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          subject: string
          html_content: string
          text_content?: string | null
          variables?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          subject?: string
          html_content?: string
          text_content?: string | null
          variables?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          id: string
          user_id: string | null
          template_id: string | null
          template_name: string | null
          recipient_email: string
          subject: string
          status: string
          error_message: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          template_id?: string | null
          template_name?: string | null
          recipient_email: string
          subject: string
          status: string
          error_message?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          template_id?: string | null
          template_name?: string | null
          recipient_email?: string
          subject?: string
          status?: string
          error_message?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_logs_template_id_fkey"
            columns: ["template_id"]
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          id: string
          organizer_id: string | null
          title: string
          description: string | null
          start_date: string
          end_date: string
          location: string | null
          mode: string | null
          price: number | null
          currency: string | null
          max_attendees: number | null
          image_url: string | null
          website: string | null
          is_approved: boolean | null
          is_featured: boolean | null
          status: string | null
          rejection_reason: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organizer_id?: string | null
          title: string
          description?: string | null
          start_date: string
          end_date: string
          location?: string | null
          mode?: string | null
          price?: number | null
          currency?: string | null
          max_attendees?: number | null
          image_url?: string | null
          website?: string | null
          is_approved?: boolean | null
          is_featured?: boolean | null
          status?: string | null
          rejection_reason?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organizer_id?: string | null
          title?: string
          description?: string | null
          start_date?: string
          end_date?: string
          location?: string | null
          mode?: string | null
          price?: number | null
          currency?: string | null
          max_attendees?: number | null
          image_url?: string | null
          website?: string | null
          is_approved?: boolean | null
          is_featured?: boolean | null
          status?: string | null
          rejection_reason?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          id: string
          event_id: string
          user_id: string | null
          attendee_name: string
          attendee_email: string
          attendee_phone: string | null
          ticket_type: string | null
          ticket_price: number | null
          payment_status: string | null
          payment_reference: string | null
          payment_date: string | null
          check_in_status: boolean | null
          check_in_time: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id?: string | null
          attendee_name: string
          attendee_email: string
          attendee_phone?: string | null
          ticket_type?: string | null
          ticket_price?: number | null
          payment_status?: string | null
          payment_reference?: string | null
          payment_date?: string | null
          check_in_status?: boolean | null
          check_in_time?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string | null
          attendee_name?: string
          attendee_email?: string
          attendee_phone?: string | null
          ticket_type?: string | null
          ticket_price?: number | null
          payment_status?: string | null
          payment_reference?: string | null
          payment_date?: string | null
          check_in_status?: boolean | null
          check_in_time?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          id: string
          instructor_id: string | null
          title: string
          description: string | null
          duration: string | null
          start_date: string | null
          end_date: string | null
          price: number | null
          currency: string | null
          max_students: number | null
          image_url: string | null
          status: string | null
          prerequisites: Json | null
          syllabus: Json | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          instructor_id?: string | null
          title: string
          description?: string | null
          duration?: string | null
          start_date?: string | null
          end_date?: string | null
          price?: number | null
          currency?: string | null
          max_students?: number | null
          image_url?: string | null
          status?: string | null
          prerequisites?: Json | null
          syllabus?: Json | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          instructor_id?: string | null
          title?: string
          description?: string | null
          duration?: string | null
          start_date?: string | null
          end_date?: string | null
          price?: number | null
          currency?: string | null
          max_students?: number | null
          image_url?: string | null
          status?: string | null
          prerequisites?: Json | null
          syllabus?: Json | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_instructor_id_fkey"
            columns: ["instructor_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          id: string
          course_id: string
          user_id: string | null
          student_name: string
          student_email: string
          student_phone: string | null
          enrollment_date: string | null
          payment_status: string | null
          payment_reference: string | null
          payment_date: string | null
          completion_status: string | null
          completion_date: string | null
          certificate_url: string | null
          progress: number | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          user_id?: string | null
          student_name: string
          student_email: string
          student_phone?: string | null
          enrollment_date?: string | null
          payment_status?: string | null
          payment_reference?: string | null
          payment_date?: string | null
          completion_status?: string | null
          completion_date?: string | null
          certificate_url?: string | null
          progress?: number | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          user_id?: string | null
          student_name?: string
          student_email?: string
          student_phone?: string | null
          enrollment_date?: string | null
          payment_status?: string | null
          payment_reference?: string | null
          payment_date?: string | null
          completion_status?: string | null
          completion_date?: string | null
          certificate_url?: string | null
          progress?: number | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          id: string
          user_id: string | null
          amount: number
          currency: string | null
          payment_method: string | null
          payment_reference: string | null
          payment_status: string | null
          payment_date: string | null
          payment_gateway: string | null
          gateway_response: Json | null
          invoice_number: string | null
          invoice_url: string | null
          related_type: string | null
          related_id: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          amount: number
          currency?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          gateway_response?: Json | null
          invoice_number?: string | null
          invoice_url?: string | null
          related_type?: string | null
          related_id?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          amount?: number
          currency?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          payment_date?: string | null
          payment_gateway?: string | null
          gateway_response?: Json | null
          invoice_number?: string | null
          invoice_url?: string | null
          related_type?: string | null
          related_id?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          id: string
          user_id: string
          name: string
          key: string
          permissions: Json | null
          last_used_at: string | null
          expires_at: string | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          key: string
          permissions?: Json | null
          last_used_at?: string | null
          expires_at?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          key?: string
          permissions?: Json | null
          last_used_at?: string | null
          expires_at?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      api_logs: {
        Row: {
          id: string
          api_key_id: string | null
          user_id: string | null
          endpoint: string
          method: string
          status_code: number | null
          response_time: number | null
          ip_address: string | null
          user_agent: string | null
          request_body: Json | null
          response_body: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          api_key_id?: string | null
          user_id?: string | null
          endpoint: string
          method: string
          status_code?: number | null
          response_time?: number | null
          ip_address?: string | null
          user_agent?: string | null
          request_body?: Json | null
          response_body?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          api_key_id?: string | null
          user_id?: string | null
          endpoint?: string
          method?: string
          status_code?: number | null
          response_time?: number | null
          ip_address?: string | null
          user_agent?: string | null
          request_body?: Json | null
          response_body?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_logs_api_key_id_fkey"
            columns: ["api_key_id"]
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_logs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          id: string
          name: string
          description: string | null
          permissions: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          permissions?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          permissions?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>
      }
      update_timestamp: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>
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

