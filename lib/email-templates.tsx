import type React from "react"
import { renderToStaticMarkup } from "react-dom/server"

// Add TypeScript interfaces for all template props at the top of the file, after the imports

// Add this after the imports
interface BaseEmailTemplateProps {
  title: string
  previewText?: string
  content: string
  footerText?: string
}

interface WelcomeEmailTemplateProps {
  name?: string
  confirmationUrl: string
}

interface PasswordResetEmailTemplateProps {
  name?: string
  resetUrl: string
}

interface MagicLinkEmailTemplateProps {
  name?: string
  magicLinkUrl: string
}

interface DeveloperWelcomeEmailTemplateProps {
  name?: string
  dashboardUrl: string
}

interface ApiKeyCreatedEmailTemplateProps {
  name?: string
  apiKey: string
  dashboardUrl: string
}

interface EventRegistrationConfirmationEmailTemplateProps {
  name?: string
  eventTitle: string
  eventDate: string
  eventLocation: string
  eventDetails: string
  ticketUrl: string
}

interface EventReminderEmailTemplateProps {
  name?: string
  eventTitle: string
  eventDate: string
  eventLocation: string
  eventStartTime: string
  ticketUrl: string
}

interface PaymentConfirmationEmailTemplateProps {
  name?: string
  amount: number
  paymentDate: string
  paymentMethod: string
  invoiceNumber: string
  invoiceUrl: string
  itemsPurchased: Array<{ name: string; price: number }>
}

interface PaymentFailedEmailTemplateProps {
  name?: string
  amount: number
  paymentDate: string
  paymentMethod: string
  errorMessage?: string
  retryUrl: string
}

interface CourseEnrollmentEmailTemplateProps {
  name?: string
  courseName: string
  courseStartDate: string
  instructorName: string
  courseUrl: string
  prerequisites: string[]
}

interface CourseCompletionEmailTemplateProps {
  name?: string
  courseName: string
  completionDate: string
  certificateUrl: string
  nextCourseRecommendations: Array<{ name: string; url: string; description: string }>
}

interface EventApprovalEmailTemplateProps {
  organizerName?: string
  eventTitle: string
  eventDate: string
  eventLocation: string
  eventUrl: string
  adminComments?: string
}

interface EventRejectionEmailTemplateProps {
  organizerName?: string
  eventTitle: string
  rejectionReason: string
  dashboardUrl: string
}

// Base email template with consistent styling
const BaseEmailTemplate = ({
  title,
  previewText = "",
  content,
  footerText = "© Hardy Technology. All rights reserved.",
}: BaseEmailTemplateProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>${title}</title>
      <meta name="description" content="${previewText}">
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9fafb;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #111827;
        }
        .logo span {
          color: #3b82f6;
        }
        .content {
          padding: 30px 20px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #6b7280;
          border-top: 1px solid #e5e7eb;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 20px 0;
        }
        .button:hover {
          background-color: #2563eb;
        }
        .secondary-button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #ffffff;
          color: #3b82f6;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 20px 0;
          border: 1px solid #3b82f6;
        }
        .secondary-button:hover {
          background-color: #f3f4f6;
        }
        .info-box {
          background-color: #f3f4f6;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
        }
        .highlight {
          font-weight: bold;
          color: #3b82f6;
        }
        .divider {
          border-top: 1px solid #e5e7eb;
          margin: 20px 0;
        }
        .social-links {
          text-align: center;
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #6b7280;
          text-decoration: none;
        }
        .social-links a:hover {
          color: #3b82f6;
        }
        @media only screen and (max-width: 600px) {
          .container {
            width: 100%;
          }
          .content {
            padding: 20px 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Hardy<span>Tech</span></div>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <div class="social-links">
            <a href="https://twitter.com/hardytech">Twitter</a>
            <a href="https://facebook.com/hardytech">Facebook</a>
            <a href="https://linkedin.com/company/hardytech">LinkedIn</a>
          </div>
          <p>${footerText}</p>
          <p>123 Tech Street, Lagos, Nigeria</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// 1. Authentication Email Templates

export const WelcomeEmailTemplate = ({ name, confirmationUrl }: WelcomeEmailTemplateProps): string => {
  const content = `
    <h1>Welcome to Hardy Technology!</h1>
    <p>Hello ${name || "there"},</p>
    <p>Thank you for signing up with Hardy Technology. We're excited to have you on board!</p>
    <p>Please confirm your email address by clicking the button below:</p>
    <div style="text-align: center;">
      <a href="${confirmationUrl}" class="button">Confirm Email Address</a>
    </div>
    <p>If you didn't create an account, you can safely ignore this email.</p>
    <div class="info-box">
      <p>Need help? Contact our support team at <a href="mailto:support@hardytechnology.xyz">support@hardytechnology.xyz</a></p>
    </div>
  `

  return BaseEmailTemplate({
    title: "Welcome to Hardy Technology",
    previewText: "Welcome to Hardy Technology - Please confirm your email",
    content,
  })
}

export const PasswordResetEmailTemplate = ({ name, resetUrl }: PasswordResetEmailTemplateProps): string => {
  const content = `
    <h1>Reset Your Password</h1>
    <p>Hello ${name || "there"},</p>
    <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center;">
      <a href="${resetUrl}" class="button">Reset Password</a>
    </div>
    <p>This link will expire in 24 hours.</p>
    <div class="info-box">
      <p>If you're having trouble, contact our support team at <a href="mailto:support@hardytechnology.xyz">support@hardytechnology.xyz</a></p>
    </div>
  `

  return BaseEmailTemplate({
    title: "Reset Your Password - Hardy Technology",
    previewText: "Reset your Hardy Technology account password",
    content,
  })
}

export const MagicLinkEmailTemplate = ({ name, magicLinkUrl }: MagicLinkEmailTemplateProps): string => {
  const content = `
    <h1>Your Login Link</h1>
    <p>Hello ${name || "there"},</p>
    <p>Click the button below to sign in to your Hardy Technology account:</p>
    <div style="text-align: center;">
      <a href="${magicLinkUrl}" class="button">Sign In</a>
    </div>
    <p>This link will expire in 10 minutes and can only be used once.</p>
    <div class="info-box">
      <p>If you didn't request this link, please ignore this email or contact us at <a href="mailto:support@hardytechnology.xyz">support@hardytechnology.xyz</a></p>
    </div>
  `

  return BaseEmailTemplate({
    title: "Your Login Link - Hardy Technology",
    previewText: "Your magic link to sign in to Hardy Technology",
    content,
  })
}

// 2. Developer-related Email Templates

export const DeveloperWelcomeEmailTemplate = ({ name, dashboardUrl }: DeveloperWelcomeEmailTemplateProps): string => {
  const content = `
    <h1>Welcome to the Developer Program!</h1>
    <p>Hello ${name || "Developer"},</p>
    <p>Welcome to the Hardy Technology Developer Program. We're excited to have you join our community of innovative developers!</p>
    <p>As a developer, you now have access to:</p>
    <ul>
      <li>Our comprehensive API documentation</li>
      <li>Developer tools and resources</li>
      <li>Technical support from our engineering team</li>
      <li>Early access to new features</li>
    </ul>
    <div style="text-align: center;">
      <a href="${dashboardUrl}" class="button">Access Developer Dashboard</a>
    </div>
    <div class="divider"></div>
    <h3>Getting Started</h3>
    <p>Here are some resources to help you get started:</p>
    <ul>
      <li><a href="#">API Documentation</a></li>
      <li><a href="#">Developer Guides</a></li>
      <li><a href="#">Sample Projects</a></li>
    </ul>
    <div class="info-box">
      <p>Questions? Join our <a href="#">Developer Community</a> or email us at <a href="mailto:developers@hardytechnology.xyz">developers@hardytechnology.xyz</a></p>
    </div>
  `

  return BaseEmailTemplate({
    title: "Welcome to the Hardy Technology Developer Program",
    previewText: "Your developer account is ready - Get started with Hardy Technology",
    content,
  })
}

export const ApiKeyCreatedEmailTemplate = ({ name, apiKey, dashboardUrl }: ApiKeyCreatedEmailTemplateProps): string => {
  const content = `
    <h1>Your API Key Has Been Created</h1>
    <p>Hello ${name || "Developer"},</p>
    <p>Your new API key has been successfully created.</p>
    <div class="info-box">
      <p>Your API Key: <span class="highlight">${apiKey}</span></p>
      <p><strong>Important:</strong> This is the only time we'll show you this key. Please store it securely.</p>
    </div>
    <p>You can manage your API keys and view usage statistics in your developer dashboard:</p>
    <div style="text-align: center;">
      <a href="${dashboardUrl}" class="button">Go to Developer Dashboard</a>
    </div>
    <div class="divider"></div>
    <h3>Security Recommendations</h3>
    <ul>
      <li>Never share your API key publicly</li>
      <li>Store your API key securely in environment variables</li>
      <li>Rotate your keys periodically</li>
    </ul>
  `

  return BaseEmailTemplate({
    title: "Your New API Key - Hardy Technology",
    previewText: "Your Hardy Technology API key has been created",
    content,
  })
}

// 3. Event Registration Email Templates

export const EventRegistrationConfirmationEmailTemplate = ({
  name,
  eventTitle,
  eventDate,
  eventLocation,
  eventDetails,
  ticketUrl,
}: EventRegistrationConfirmationEmailTemplateProps): string => {
  const content = `
    <h1>Event Registration Confirmed!</h1>
    <p>Hello ${name || "there"},</p>
    <p>Thank you for registering for <strong>${eventTitle}</strong>. Your registration has been confirmed!</p>
    <div class="info-box">
      <h3>Event Details</h3>
      <p><strong>Date:</strong> ${eventDate}</p>
      <p><strong>Location:</strong> ${eventLocation}</p>
      <p><strong>Details:</strong> ${eventDetails}</p>
    </div>
    <div style="text-align: center;">
      <a href="${ticketUrl}" class="button">View Your Ticket</a>
    </div>
    <div class="divider"></div>
    <h3>What's Next?</h3>
    <ul>
      <li>Add this event to your calendar</li>
      <li>Prepare any questions you have for the speakers</li>
      <li>Share this event with colleagues who might be interested</li>
    </ul>
    <p>We look forward to seeing you at the event!</p>
  `

  return BaseEmailTemplate({
    title: `Registration Confirmed: ${eventTitle}`,
    previewText: `Your registration for ${eventTitle} has been confirmed`,
    content,
  })
}

export const EventReminderEmailTemplate = ({
  name,
  eventTitle,
  eventDate,
  eventLocation,
  eventStartTime,
  ticketUrl,
}: EventReminderEmailTemplateProps): string => {
  const content = `
    <h1>Event Reminder: ${eventTitle}</h1>
    <p>Hello ${name || "there"},</p>
    <p>This is a friendly reminder that <strong>${eventTitle}</strong> is coming up soon!</p>
    <div class="info-box">
      <h3>Event Details</h3>
      <p><strong>Date:</strong> ${eventDate}</p>
      <p><strong>Time:</strong> ${eventStartTime}</p>
      <p><strong>Location:</strong> ${eventLocation}</p>
    </div>
    <div style="text-align: center;">
      <a href="${ticketUrl}" class="button">View Your Ticket</a>
    </div>
    <div class="divider"></div>
    <h3>Preparation Tips</h3>
    <ul>
      <li>Arrive 15 minutes early for check-in</li>
      <li>Bring your ticket (digital or printed)</li>
      <li>Prepare any questions you have for the speakers</li>
    </ul>
    <p>We look forward to seeing you at the event!</p>
  `

  return BaseEmailTemplate({
    title: `Reminder: ${eventTitle} is Coming Up!`,
    previewText: `Your upcoming event: ${eventTitle} on ${eventDate}`,
    content,
  })
}

// 4. Payment Confirmation Email Templates

export const PaymentConfirmationEmailTemplate = ({
  name,
  amount,
  paymentDate,
  paymentMethod,
  invoiceNumber,
  invoiceUrl,
  itemsPurchased,
}: PaymentConfirmationEmailTemplateProps): string => {
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount)

  const content = `
    <h1>Payment Confirmation</h1>
    <p>Hello ${name || "there"},</p>
    <p>Thank you for your payment. We've received your payment of <strong>${formattedAmount}</strong>.</p>
    <div class="info-box">
      <h3>Payment Details</h3>
      <p><strong>Amount:</strong> ${formattedAmount}</p>
      <p><strong>Date:</strong> ${paymentDate}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
    </div>
    <h3>Items Purchased</h3>
    <ul>
      ${itemsPurchased.map((item) => `<li>${item.name} - ${new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(item.price)}</li>`).join("")}
    </ul>
    <div style="text-align: center;">
      <a href="${invoiceUrl}" class="button">View Invoice</a>
    </div>
    <div class="divider"></div>
    <p>If you have any questions about this payment, please contact our support team at <a href="mailto:billing@hardytechnology.xyz">billing@hardytechnology.xyz</a>.</p>
  `

  return BaseEmailTemplate({
    title: "Payment Confirmation - Hardy Technology",
    previewText: `Your payment of ${formattedAmount} has been received`,
    content,
  })
}

export const PaymentFailedEmailTemplate = ({
  name,
  amount,
  paymentDate,
  paymentMethod,
  errorMessage,
  retryUrl,
}: PaymentFailedEmailTemplateProps): string => {
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount)

  const content = `
    <h1>Payment Failed</h1>
    <p>Hello ${name || "there"},</p>
    <p>We're sorry, but your recent payment attempt of <strong>${formattedAmount}</strong> was unsuccessful.</p>
    <div class="info-box">
      <h3>Payment Details</h3>
      <p><strong>Amount:</strong> ${formattedAmount}</p>
      <p><strong>Date:</strong> ${paymentDate}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p><strong>Error:</strong> ${errorMessage || "Your payment could not be processed."}</p>
    </div>
    <div style="text-align: center;">
      <a href="${retryUrl}" class="button">Try Payment Again</a>
    </div>
    <div class="divider"></div>
    <h3>Common Issues</h3>
    <ul>
      <li>Insufficient funds</li>
      <li>Incorrect card details</li>
      <li>Card expired</li>
      <li>Bank declined the transaction</li>
    </ul>
    <p>If you continue to experience issues, please contact our support team at <a href="mailto:billing@hardytechnology.xyz">billing@hardytechnology.xyz</a>.</p>
  `

  return BaseEmailTemplate({
    title: "Payment Failed - Hardy Technology",
    previewText: "Your recent payment attempt was unsuccessful",
    content,
  })
}

// 5. Training Course Email Templates

export const CourseEnrollmentEmailTemplate = ({
  name,
  courseName,
  courseStartDate,
  instructorName,
  courseUrl,
  prerequisites,
}: CourseEnrollmentEmailTemplateProps): string => {
  const content = `
    <h1>Welcome to ${courseName}!</h1>
    <p>Hello ${name || "there"},</p>
    <p>Thank you for enrolling in <strong>${courseName}</strong>. We're excited to have you join this course!</p>
    <div class="info-box">
      <h3>Course Details</h3>
      <p><strong>Start Date:</strong> ${courseStartDate}</p>
      <p><strong>Instructor:</strong> ${instructorName}</p>
    </div>
    <div style="text-align: center;">
      <a href="${courseUrl}" class="button">Access Your Course</a>
    </div>
    <div class="divider"></div>
    <h3>Getting Started</h3>
    <p>To prepare for this course, please:</p>
    <ul>
      ${prerequisites.map((prereq) => `<li>${prereq}</li>`).join("")}
    </ul>
    <h3>Course Schedule</h3>
    <p>You'll receive a detailed course schedule in a separate email. All sessions will be recorded and made available in your course dashboard.</p>
    <p>If you have any questions, please contact our education team at <a href="mailto:education@hardytechnology.xyz">education@hardytechnology.xyz</a>.</p>
  `

  return BaseEmailTemplate({
    title: `Welcome to ${courseName} - Hardy Technology`,
    previewText: `Your enrollment in ${courseName} has been confirmed`,
    content,
  })
}

export const CourseCompletionEmailTemplate = ({
  name,
  courseName,
  completionDate,
  certificateUrl,
  nextCourseRecommendations,
}: CourseCompletionEmailTemplateProps): string => {
  const content = `
    <h1>Congratulations on Completing ${courseName}!</h1>
    <p>Hello ${name || "there"},</p>
    <p>Congratulations on successfully completing <strong>${courseName}</strong>! We're proud of your achievement and dedication to expanding your skills.</p>
    <div class="info-box">
      <h3>Course Completion Details</h3>
      <p><strong>Course:</strong> ${courseName}</p>
      <p><strong>Completion Date:</strong> ${completionDate}</p>
    </div>
    <div style="text-align: center;">
      <a href="${certificateUrl}" class="button">View Your Certificate</a>
    </div>
    <div class="divider"></div>
    <h3>What's Next?</h3>
    <p>Continue your learning journey with these recommended courses:</p>
    <ul>
      ${nextCourseRecommendations.map((course) => `<li><a href="${course.url}">${course.name}</a> - ${course.description}</li>`).join("")}
    </ul>
    <p>We hope you enjoyed the course and look forward to seeing you in future training programs!</p>
  `

  return BaseEmailTemplate({
    title: `Congratulations on Completing ${courseName} - Hardy Technology`,
    previewText: `You've successfully completed ${courseName}`,
    content,
  })
}

// 6. Event Organizer Email Templates

export const EventApprovalEmailTemplate = ({
  organizerName,
  eventTitle,
  eventDate,
  eventLocation,
  eventUrl,
  adminComments,
}: EventApprovalEmailTemplateProps): string => {
  const content = `
    <h1>Your Event Has Been Approved!</h1>
    <p>Hello ${organizerName || "Organizer"},</p>
    <p>We're pleased to inform you that your event <strong>${eventTitle}</strong> has been approved and is now listed on our platform.</p>
    <div class="info-box">
      <h3>Event Details</h3>
      <p><strong>Title:</strong> ${eventTitle}</p>
      <p><strong>Date:</strong> ${eventDate}</p>
      <p><strong>Location:</strong> ${eventLocation}</p>
    </div>
    <div style="text-align: center;">
      <a href="${eventUrl}" class="button">View Your Event</a>
    </div>
    ${
      adminComments
        ? `
    <div class="divider"></div>
    <h3>Admin Comments</h3>
    <p>${adminComments}</p>
    `
        : ""
    }
    <div class="divider"></div>
    <h3>Next Steps</h3>
    <ul>
      <li>Share your event on social media</li>
      <li>Monitor registrations through your organizer dashboard</li>
      <li>Prepare your event materials</li>
    </ul>
    <p>If you need to make any changes to your event, please log in to your organizer dashboard.</p>
  `

  return BaseEmailTemplate({
    title: `Event Approved: ${eventTitle} - Hardy Technology`,
    previewText: `Your event ${eventTitle} has been approved`,
    content,
  })
}

export const EventRejectionEmailTemplate = ({
  organizerName,
  eventTitle,
  rejectionReason,
  dashboardUrl,
}: EventRejectionEmailTemplateProps): string => {
  const content = `
    <h1>Event Submission Update</h1>
    <p>Hello ${organizerName || "Organizer"},</p>
    <p>Thank you for submitting your event <strong>${eventTitle}</strong> for listing on our platform.</p>
    <p>After careful review, we're unable to approve your event in its current form. We encourage you to address the feedback below and resubmit your event.</p>
    <div class="info-box">
      <h3>Feedback</h3>
      <p>${rejectionReason}</p>
    </div>
    <div style="text-align: center;">
      <a href="${dashboardUrl}" class="button">Edit and Resubmit</a>
    </div>
    <div class="divider"></div>
    <h3>Common Reasons for Rejection</h3>
    <ul>
      <li>Incomplete event information</li>
      <li>Unclear event description</li>
      <li>Inappropriate content</li>
      <li>Duplicate event submission</li>
    </ul>
    <p>If you have any questions or need clarification, please contact our events team at <a href="mailto:events@hardytechnology.xyz">events@hardytechnology.xyz</a>.</p>
  `

  return BaseEmailTemplate({
    title: `Event Submission Update: ${eventTitle} - Hardy Technology`,
    previewText: `Important information about your event submission`,
    content,
  })
}

// Helper function to convert React components to HTML strings
export const renderEmailTemplate = (template: React.ReactElement): string => {
  return renderToStaticMarkup(template)
}

// Function to generate Supabase Auth email templates
export const generateSupabaseAuthTemplates = () => {
  // These templates follow Supabase's template format with variables like {{ .ConfirmationURL }}

  // Confirmation template (signup)
  const confirmationTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Confirm Your Email</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9fafb;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #111827;
        }
        .logo span {
          color: #3b82f6;
        }
        .content {
          padding: 30px 20px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #6b7280;
          border-top: 1px solid #e5e7eb;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #3b82f6;
          color: white !important;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 20px 0;
        }
        .info-box {
          background-color: #f3f4f6;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
        }
        .social-links {
          text-align: center;
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #6b7280;
          text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
          .container {
            width: 100%;
          }
          .content {
            padding: 20px 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Hardy<span>Tech</span></div>
        </div>
        <div class="content">
          <h1>Confirm Your Email</h1>
          <p>Hello{{ if .Data.first_name }} {{ .Data.first_name }}{{ end }},</p>
          <p>Thank you for signing up with Hardy Technology. We're excited to have you on board!</p>
          <p>Please confirm your email address by clicking the button below:</p>
          <div style="text-align: center;">
            <a href="{{ .ConfirmationURL }}" class="button">Confirm Email Address</a>
          </div>
          <p>Or use this code: <strong>{{ .Token }}</strong></p>
          <p>If you didn't create an account, you can safely ignore this email.</p>
          <div class="info-box">
            <p>Need help? Contact our support team at <a href="mailto:support@hardytechnology.xyz">support@hardytechnology.xyz</a></p>
          </div>
        </div>
        <div class="footer">
          <div class="social-links">
            <a href="https://twitter.com/hardytech">Twitter</a>
            <a href="https://facebook.com/hardytech">Facebook</a>
            <a href="https://linkedin.com/company/hardytech">LinkedIn</a>
          </div>
          <p>© Hardy Technology. All rights reserved.</p>
          <p>123 Tech Street, Lagos, Nigeria</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Magic link template
  const magicLinkTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Login Link</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9fafb;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #111827;
        }
        .logo span {
          color: #3b82f6;
        }
        .content {
          padding: 30px 20px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #6b7280;
          border-top: 1px solid #e5e7eb;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #3b82f6;
          color: white !important;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 20px 0;
        }
        .info-box {
          background-color: #f3f4f6;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
        }
        .social-links {
          text-align: center;
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #6b7280;
          text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
          .container {
            width: 100%;
          }
          .content {
            padding: 20px 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Hardy<span>Tech</span></div>
        </div>
        <div class="content">
          <h1>Your Login Link</h1>
          <p>Hello{{ if .Data.first_name }} {{ .Data.first_name }}{{ end }},</p>
          <p>Click the button below to sign in to your Hardy Technology account:</p>
          <div style="text-align: center;">
            <a href="{{ .ConfirmationURL }}" class="button">Sign In</a>
          </div>
          <p>Or use this code: <strong>{{ .Token }}</strong></p>
          <p>This link will expire in 10 minutes and can only be used once.</p>
          <div class="info-box">
            <p>If you didn't request this link, please ignore this email or contact us at <a href="mailto:support@hardytechnology.xyz">support@hardytechnology.xyz</a></p>
          </div>
        </div>
        <div class="footer">
          <div class="social-links">
            <a href="https://twitter.com/hardytech">Twitter</a>
            <a href="https://facebook.com/hardytech">Facebook</a>
            <a href="https://linkedin.com/company/hardytech">LinkedIn</a>
          </div>
          <p>© Hardy Technology. All rights reserved.</p>
          <p>123 Tech Street, Lagos, Nigeria</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Reset password template
  const resetPasswordTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9fafb;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #111827;
        }
        .logo span {
          color: #3b82f6;
        }
        .content {
          padding: 30px 20px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #6b7280;
          border-top: 1px solid #e5e7eb;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #3b82f6;
          color: white !important;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 20px 0;
        }
        .info-box {
          background-color: #f3f4f6;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
        }
        .social-links {
          text-align: center;
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #6b7280;
          text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
          .container {
            width: 100%;
          }
          .content {
            padding: 20px 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Hardy<span>Tech</span></div>
        </div>
        <div class="content">
          <h1>Reset Your Password</h1>
          <p>Hello{{ if .Data.first_name }} {{ .Data.first_name }}{{ end }},</p>
          <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
          <p>To reset your password, click the button below:</p>
          <div style="text-align: center;">
            <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
          </div>
          <p>Or use this code: <strong>{{ .Token }}</strong></p>
          <p>This link will expire in 24 hours.</p>
          <div class="info-box">
            <p>If you're having trouble, contact our support team at <a href="mailto:support@hardytechnology.xyz">support@hardytechnology.xyz</a></p>
          </div>
        </div>
        <div class="footer">
          <div class="social-links">
            <a href="https://twitter.com/hardytech">Twitter</a>
            <a href="https://facebook.com/hardytech">Facebook</a>
            <a href="https://linkedin.com/company/hardytech">LinkedIn</a>
          </div>
          <p>© Hardy Technology. All rights reserved.</p>
          <p>123 Tech Street, Lagos, Nigeria</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Invite template
  const inviteTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>You're Invited to Join Hardy Technology</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9fafb;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #111827;
        }
        .logo span {
          color: #3b82f6;
        }
        .content {
          padding: 30px 20px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #6b7280;
          border-top: 1px solid #e5e7eb;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #3b82f6;
          color: white !important;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 20px 0;
        }
        .info-box {
          background-color: #f3f4f6;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
        }
        .social-links {
          text-align: center;
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #6b7280;
          text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
          .container {
            width: 100%;
          }
          .content {
            padding: 20px 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Hardy<span>Tech</span></div>
        </div>
        <div class="content">
          <h1>You're Invited!</h1>
          <p>Hello,</p>
          <p>You've been invited to join Hardy Technology. We're excited to have you on board!</p>
          <p>Click the button below to accept the invitation and create your account:</p>
          <div style="text-align: center;">
            <a href="{{ .ConfirmationURL }}" class="button">Accept Invitation</a>
          </div>
          <p>Or use this code: <strong>{{ .Token }}</strong></p>
          <p>This invitation will expire in 7 days.</p>
          <div class="info-box">
            <p>If you have any questions, please contact our support team at <a href="mailto:support@hardytechnology.xyz">support@hardytechnology.xyz</a></p>
          </div>
        </div>
        <div class="footer">
          <div class="social-links">
            <a href="https://twitter.com/hardytech">Twitter</a>
            <a href="https://facebook.com/hardytech">Facebook</a>
            <a href="https://linkedin.com/company/hardytech">LinkedIn</a>
          </div>
          <p>© Hardy Technology. All rights reserved.</p>
          <p>123 Tech Street, Lagos, Nigeria</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Email change template
  const emailChangeTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Confirm Email Change</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9fafb;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #111827;
        }
        .logo span {
          color: #3b82f6;
        }
        .content {
          padding: 30px 20px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 14px;
          color: #6b7280;
          border-top: 1px solid #e5e7eb;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #3b82f6;
          color: white !important;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin: 20px 0;
        }
        .info-box {
          background-color: #f3f4f6;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
        }
        .social-links {
          text-align: center;
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #6b7280;
          text-decoration: none;
        }
        @media only screen and (max-width: 600px) {
          .container {
            width: 100%;
          }
          .content {
            padding: 20px 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Hardy<span>Tech</span></div>
        </div>
        <div class="content">
          <h1>Confirm Email Change</h1>
          <p>Hello{{ if .Data.first_name }} {{ .Data.first_name }}{{ end }},</p>
          <p>You are requesting to update your email address from <strong>{{ .Email }}</strong> to <strong>{{ .NewEmail }}</strong>.</p>
          <p>To confirm this change, click the button below:</p>
          <div style="text-align: center;">
            <a href="{{ .ConfirmationURL }}" class="button">Confirm Email Change</a>
          </div>
          <p>Or use this code: <strong>{{ .Token }}</strong></p>
          <p>If you did not request this change, please contact our support team immediately.</p>
          <div class="info-box">
            <p>Need help? Contact our support team at <a href="mailto:support@hardytechnology.xyz">support@hardytechnology.xyz</a></p>
          </div>
        </div>
        <div class="footer">
          <div class="social-links">
            <a href="https://twitter.com/hardytech">Twitter</a>
            <a href="https://facebook.com/hardytech">Facebook</a>
            <a href="https://linkedin.com/company/hardytech">LinkedIn</a>
          </div>
          <p>© Hardy Technology. All rights reserved.</p>
          <p>123 Tech Street, Lagos, Nigeria</p>
        </div>
      </div>
    </body>
    </html>
  `

  return {
    confirmationTemplate,
    magicLinkTemplate,
    resetPasswordTemplate,
    inviteTemplate,
    emailChangeTemplate,
  }
}

// Export the Supabase templates
export const supabaseTemplates = generateSupabaseAuthTemplates()

