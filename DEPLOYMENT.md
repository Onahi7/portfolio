# Deployment Guide for Hardy Technology Website

This guide provides step-by-step instructions for deploying the Hardy Technology website to Vercel.

## Prerequisites

1. A [GitHub](https://github.com) account with your project repository
2. A [Vercel](https://vercel.com) account
3. A [Supabase](https://supabase.com) account with a project set up
4. A [Paystack](https://paystack.com) account for payment processing

## Step 1: Prepare Your Environment Variables

1. Copy the `.env.example` file to a new file named `.env.local` for local development
2. Fill in all the required environment variables with your actual credentials
3. Keep this file handy as you'll need these values when setting up Vercel

## Step 2: Set Up Supabase

1. Create a new Supabase project if you haven't already
2. Run the database migrations:
   - Navigate to the SQL Editor in your Supabase dashboard
   - Copy the contents of `supabase/migrations/20230501000000_auth_schema.sql`
   - Run the SQL query to create all necessary tables and functions
3. Set up authentication:
   - Go to Authentication → Settings
   - Configure Site URL to match your production URL
   - Enable the email provider
   - Customize email templates as needed
4. Set up webhooks:
   - Go to Database → Webhooks
   - Create a new webhook for auth events pointing to `https://your-domain.com/api/webhooks/supabase-auth`
   - Set the webhook secret and add it to your environment variables

## Step 3: Set Up Paystack

1. Create a Paystack account if you haven't already
2. Get your public and secret keys from the Paystack dashboard
3. Set up a webhook in Paystack pointing to `https://your-domain.com/api/webhooks/payment`
4. Add your Paystack keys to your environment variables

## Step 4: Deploy to Vercel

1. Push your code to GitHub if you haven't already
2. Log in to your Vercel account
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build (or leave as default)
   - Output Directory: .next (or leave as default)
6. Add all environment variables:
   - Click on "Environment Variables"
   - Add all the variables from your `.env.local` file
   - Make sure to include all required variables listed in `.env.example`
7. Click "Deploy"

## Step 5: Configure Custom Domain (Optional)

1. Once deployed, go to your project settings in Vercel
2. Click on "Domains"
3. Add your custom domain and follow the instructions to set up DNS

## Step 6: Set Up Integrations

1. **Supabase Integration**:
   - In Vercel, go to your project
   - Click on "Integrations" → "Browse Marketplace"
   - Find and add the Supabase integration
   - Connect it to your Supabase project

2. **Analytics Integration** (Optional):
   - Set up Google Analytics by adding your tracking ID to the environment variables
   - Consider adding other analytics tools like Hotjar or Sentry

## Step 7: Post-Deployment Tasks

1. Create an admin user:
   - Sign up using the admin email specified in your environment variables
   - Use the admin dashboard to set up initial content

2. Test all functionality:
   - Authentication flows
   - Payment processing
   - Email sending
   - Training event creation and registration

3. Set up monitoring:
   - Configure Vercel Analytics
   - Set up alerts for any critical errors

## Troubleshooting

If you encounter issues during deployment:

1. Check Vercel build logs for errors
2. Verify all environment variables are correctly set
3. Ensure Supabase and Paystack webhooks are properly configured
4. Check that database migrations ran successfully

## Continuous Deployment

Vercel automatically deploys when you push changes to your repository. To customize this behavior:

1. Go to your project settings in Vercel
2. Click on "Git"
3. Configure production and preview deployment settings as needed

## Security Considerations

1. Never commit `.env` files or any files containing secrets to your repository
2. Regularly rotate API keys and secrets
3. Use environment variables for all sensitive information
4. Consider setting up IP restrictions for admin routes

## Support

If you need help with deployment, contact:
- Vercel Support: [https://vercel.com/support](https://vercel.com/support)
- Supabase Support: [https://supabase.com/support](https://supabase.com/support)
- Paystack Support: [https://paystack.com/support](https://paystack.com/support)

