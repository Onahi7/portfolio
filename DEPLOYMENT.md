# Deployment Guide for Hardy Technology Website

This guide provides step-by-step instructions for deploying the Hardy Technology website to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- A Supabase account (sign up at [supabase.com](https://supabase.com))
- A Paystack account (sign up at [paystack.com](https://paystack.com))

## Step 1: Prepare Your Repository

1. Ensure your code is in a GitHub repository
2. Make sure your repository includes the `.env.example` file (but not your actual `.env` file with secrets)
3. Verify your `next.config.js` and `vercel.json` files are properly configured

## Step 2: Set Up Supabase

1. Create a new Supabase project
2. Set up the database schema:
   - Go to the SQL Editor in the Supabase dashboard
   - Run the migration scripts from your project
3. Configure authentication:
   - Enable Email/Password sign-in
   - Set up email templates (you can use the templates from `lib/email-templates.tsx`)
4. Get your Supabase credentials:
   - Project URL
   - Anon key
   - Service role key
   - JWT secret

## Step 3: Set Up Paystack

1. Create a Paystack account if you don't have one
2. Get your API keys from the Paystack dashboard
3. Set up a webhook endpoint (you'll configure this after deployment)

## Step 4: Deploy to Vercel

1. Log in to your Vercel account
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `.` (root)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Set up environment variables:
   - Click on "Environment Variables"
   - Add all variables from your `.env.example` file with your actual values
   - Make sure to include all Supabase and Paystack credentials
6. Click "Deploy"

## Step 5: Configure Webhooks

After deployment, you'll need to set up webhooks:

1. **Supabase Auth Webhook**:
   - In your Supabase dashboard, go to Authentication → Webhooks
   - Add a new webhook pointing to: `https://your-vercel-url.vercel.app/api/webhooks/supabase-auth`
   - Select the events you want to trigger the webhook (e.g., user.created, user.updated)
   - Add your webhook secret

2. **Paystack Webhook**:
   - In your Paystack dashboard, go to Settings → API Keys & Webhooks
   - Add a webhook URL: `https://your-vercel-url.vercel.app/api/webhooks/payment`
   - Select the events you want to receive (e.g., charge.success)

## Step 6: Set Up Custom Domain (Optional)

1. In your Vercel project, go to "Settings" → "Domains"
2. Add your custom domain
3. Follow Vercel's instructions to configure DNS settings

## Step 7: Post-Deployment Checks

1. Test the authentication flow
2. Test the payment process
3. Verify email sending works correctly
4. Check that all pages load properly
5. Test the admin dashboard

## Troubleshooting

If you encounter any issues during deployment:

1. **Build Errors**:
   - Check the Vercel build logs for specific error messages
   - Ensure all dependencies are correctly installed
   - Verify that all required environment variables are set

2. **Runtime Errors**:
   - Check the Vercel function logs
   - Verify that your Supabase and Paystack credentials are correct
   - Ensure your database schema is properly set up

3. **Database Connection Issues**:
   - Verify that your database connection string is correct
   - Check that your IP is allowed in Supabase's connection pooling settings

## Maintenance

1. **Updating Your Site**:
   - Push changes to your GitHub repository
   - Vercel will automatically rebuild and deploy your site

2. **Environment Variables**:
   - If you need to update environment variables, go to your project settings in Vercel
   - Changes to environment variables require a redeployment

3. **Monitoring**:
   - Use Vercel Analytics to monitor your site's performance
   - Set up alerts for any critical issues

For additional help, refer to the [Vercel documentation](https://vercel.com/docs) or [contact support](mailto:support@hardytechnology.xyz).

