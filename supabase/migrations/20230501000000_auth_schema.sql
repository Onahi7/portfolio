-- This migration file sets up the necessary tables and fields for authentication and email templates

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a profiles table that extends the auth.users table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  website TEXT,
  company TEXT,
  job_title TEXT,
  bio TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal_code TEXT,
  email_preferences JSONB DEFAULT '{"marketing": true, "notifications": true, "updates": true}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a table for email templates
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  variables JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a table for email logs
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  template_id UUID REFERENCES public.email_templates(id) ON DELETE SET NULL,
  template_name TEXT,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL,
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a table for events
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  organizer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  mode TEXT CHECK (mode IN ('online', 'in-person', 'hybrid')),
  price DECIMAL(10, 2),
  currency TEXT DEFAULT 'NGN',
  max_attendees INTEGER,
  image_url TEXT,
  website TEXT,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  rejection_reason TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a table for event registrations
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  attendee_name TEXT NOT NULL,
  attendee_email TEXT NOT NULL,
  attendee_phone TEXT,
  ticket_type TEXT,
  ticket_price DECIMAL(10, 2),
  payment_status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'refunded', 'failed')),
  payment_reference TEXT,
  payment_date TIMESTAMP WITH TIME ZONE,
  check_in_status BOOLEAN DEFAULT false,
  check_in_time TIMESTAMP WITH TIME ZONE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a table for courses
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  instructor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  price DECIMAL(10, 2),
  currency TEXT DEFAULT 'NGN',
  max_students INTEGER,
  image_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'cancelled')),
  prerequisites JSONB,
  syllabus JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a table for course enrollments
CREATE TABLE IF NOT EXISTS public.course_enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_phone TEXT,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  payment_status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'refunded', 'failed')),
  payment_reference TEXT,
  payment_date TIMESTAMP WITH TIME ZONE,
  completion_status TEXT DEFAULT 'in_progress' CHECK (status IN ('not_started', 'in_progress', 'completed', 'dropped')),
  completion_date TIMESTAMP WITH TIME ZONE,
  certificate_url TEXT,
  progress DECIMAL(5, 2) DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a table for payments
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  payment_method TEXT,
  payment_reference TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'successful', 'failed', 'refunded')),
  payment_date TIMESTAMP WITH TIME ZONE,
  payment_gateway TEXT,
  gateway_response JSONB,
  invoice_number TEXT,
  invoice_url TEXT,
  related_type TEXT CHECK (related_type IN ('event', 'course', 'subscription', 'other')),
  related_id UUID,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a table for developer API keys
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key TEXT NOT NULL UNIQUE,
  permissions JSONB,
  last_used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a table for API usage logs
CREATE TABLE IF NOT EXISTS public.api_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  api_key_id UUID REFERENCES public.api_keys(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER,
  response_time INTEGER, -- in milliseconds
  ip_address TEXT,
  user_agent TEXT,
  request_body JSONB,
  response_body JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a table for user roles
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create a table for user role assignments
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role_id)
);

-- Insert default roles
INSERT INTO public.roles (name, description, permissions)
VALUES 
  ('admin', 'Administrator with full access', '{"all": true}'::JSONB),
  ('developer', 'Developer with API access', '{"api": true, "events": {"read": true}, "courses": {"read": true}}'::JSONB),
  ('instructor', 'Course instructor', '{"courses": {"create": true, "read": true, "update": true}}'::JSONB),
  ('organizer', 'Event organizer', '{"events": {"create": true, "read": true, "update": true}}'::JSONB),
  ('student', 'Course student', '{"courses": {"read": true}}'::JSONB),
  ('attendee', 'Event attendee', '{"events": {"read": true}}'::JSONB);

-- Insert default email templates
INSERT INTO public.email_templates (name, subject, html_content, text_content, variables)
VALUES 
  ('welcome', 'Welcome to Hardy Technology', '<!-- HTML welcome template -->', 'Welcome to Hardy Technology!', '{"name": "string", "confirmationUrl": "string"}'::JSONB),
  ('password_reset', 'Reset Your Password - Hardy Technology', '<!-- HTML password reset template -->', 'Reset your password', '{"name": "string", "resetUrl": "string"}'::JSONB),
  ('magic_link', 'Your Login Link - Hardy Technology', '<!-- HTML magic link template -->', 'Your login link', '{"name": "string", "magicLinkUrl": "string"}'::JSONB),
  ('event_registration', 'Registration Confirmed: {{eventTitle}}', '<!-- HTML event registration template -->', 'Your registration is confirmed', '{"name": "string", "eventTitle": "string", "eventDate": "string", "eventLocation": "string", "eventDetails": "string", "ticketUrl": "string"}'::JSONB),
  ('payment_confirmation', 'Payment Confirmation - Hardy Technology', '<!-- HTML payment confirmation template -->', 'Your payment is confirmed', '{"name": "string", "amount": "number", "paymentDate": "string", "paymentMethod": "string", "invoiceNumber": "string", "invoiceUrl": "string", "itemsPurchased": "array"}'::JSONB),
  ('course_enrollment', 'Welcome to {{courseName}} - Hardy Technology', '<!-- HTML course enrollment template -->', 'Welcome to the course', '{"name": "string", "courseName": "string", "courseStartDate": "string", "instructorName": "string", "courseUrl": "string", "prerequisites": "array"}'::JSONB),
  ('event_approval', 'Event Approved: {{eventTitle}} - Hardy Technology', '<!-- HTML event approval template -->', 'Your event has been approved', '{"organizerName": "string", "eventTitle": "string", "eventDate": "string", "eventLocation": "string", "eventUrl": "string", "adminComments": "string"}'::JSONB);

-- Create RLS policies

-- Profiles table policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Events table policies
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view approved events"
  ON public.events FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Organizers can view their own events"
  ON public.events FOR SELECT
  USING (auth.uid() = organizer_id);

CREATE POLICY "Organizers can create events"
  ON public.events FOR INSERT
  WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Organizers can update their own events"
  ON public.events FOR UPDATE
  USING (auth.uid() = organizer_id);

-- Create functions and triggers

-- Function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email_preferences)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    '{"marketing": true, "notifications": true, "updates": true}'::JSONB
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update timestamp triggers to all tables
CREATE TRIGGER update_profiles_timestamp
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();

CREATE TRIGGER update_email_templates_timestamp
  BEFORE UPDATE ON public.email_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();

CREATE TRIGGER update_events_timestamp
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();

CREATE TRIGGER update_courses_timestamp
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();

CREATE TRIGGER update_api_keys_timestamp
  BEFORE UPDATE ON public.api_keys
  FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();

CREATE TRIGGER update_roles_timestamp
  BEFORE UPDATE ON public.roles
  FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();

