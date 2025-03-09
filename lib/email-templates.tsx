import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

// Base interface for all email templates
interface BaseEmailTemplateProps {
  name?: string
}

// Specific interfaces for each email template
interface WelcomeEmailTemplateProps extends BaseEmailTemplateProps {
  confirmationUrl: string
}

interface PasswordResetEmailTemplateProps extends BaseEmailTemplateProps {
  resetUrl: string
}

interface VerificationEmailTemplateProps extends BaseEmailTemplateProps {
  verificationUrl: string
}

interface EventRegistrationEmailTemplateProps extends BaseEmailTemplateProps {
  eventName: string
  eventDate: string
  eventLocation: string
  ticketInfo: {
    ticketType: string
    ticketPrice: number
    ticketId: string
  }
}

interface PaymentConfirmationEmailTemplateProps extends BaseEmailTemplateProps {
  paymentAmount: number
  paymentDate: string
  paymentId: string
  itemsPurchased: Array<{ name: string; price: number }>
}

interface CourseEnrollmentEmailTemplateProps extends BaseEmailTemplateProps {
  courseName: string
  startDate: string
  instructorName: string
  accessLink: string
}

interface EventOrganizerNotificationProps extends BaseEmailTemplateProps {
  eventName: string
  registrantName: string
  registrantEmail: string
  registrationDate: string
  ticketType: string
}

// Base email layout component
const BaseEmailLayout = ({ children, title }: { children: React.ReactNode; title: string }): JSX.Element => (
  <html>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>{`
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 1px solid #eaeaea;
        }
        .logo {
          max-width: 150px;
          height: auto;
        }
        .content {
          padding: 20px 0;
        }
        .footer {
          text-align: center;
          padding: 20px 0;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #eaeaea;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: 500;
          margin: 20px 0;
        }
        .button:hover {
          background-color: #0051cc;
        }
        h1, h2, h3 {
          color: #0070f3;
        }
        p {
          margin: 10px 0;
        }
      `}</style>
    </head>
    <body>
      <div className="container">
        <div className="header">
          <img src="https://hardytechnology.xyz/logo.png" alt="Hardy Technology" className="logo" />
        </div>
        <div className="content">{children}</div>
        <div className="footer">
          <p>© {new Date().getFullYear()} Hardy Technology. All rights reserved.</p>
          <p>123 Tech Street, Lagos, Nigeria</p>
          <p>
            <a href="https://hardytechnology.xyz/privacy">Privacy Policy</a> |
            <a href="https://hardytechnology.xyz/terms">Terms of Service</a>
          </p>
        </div>
      </div>
    </body>
  </html>
)

// Email template functions
export const WelcomeEmailTemplate = ({ name, confirmationUrl }: WelcomeEmailTemplateProps): string => {
  const emailContent = (
    <BaseEmailLayout title="Welcome to Hardy Technology">
      <h1>Welcome to Hardy Technology!</h1>
      <p>Hello {name || "there"},</p>
      <p>Thank you for joining Hardy Technology. We're excited to have you on board!</p>
      <p>Please confirm your email address by clicking the button below:</p>
      <p style={{ textAlign: "center" }}>
        <a href={confirmationUrl} className="button">
          Confirm Email
        </a>
      </p>
      <p>If you didn't create an account, you can safely ignore this email.</p>
      <p>
        Best regards,
        <br />
        The Hardy Technology Team
      </p>
    </BaseEmailLayout>
  )

  return renderToStaticMarkup(emailContent)
}

export const PasswordResetEmailTemplate = ({ name, resetUrl }: PasswordResetEmailTemplateProps): string => {
  const emailContent = (
    <BaseEmailLayout title="Reset Your Password">
      <h1>Reset Your Password</h1>
      <p>Hello {name || "there"},</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      <p style={{ textAlign: "center" }}>
        <a href={resetUrl} className="button">
          Reset Password
        </a>
      </p>
      <p>If you didn't request a password reset, you can safely ignore this email.</p>
      <p>This link will expire in 24 hours.</p>
      <p>
        Best regards,
        <br />
        The Hardy Technology Team
      </p>
    </BaseEmailLayout>
  )

  return renderToStaticMarkup(emailContent)
}

export const VerificationEmailTemplate = ({ name, verificationUrl }: VerificationEmailTemplateProps): string => {
  const emailContent = (
    <BaseEmailLayout title="Verify Your Email">
      <h1>Verify Your Email Address</h1>
      <p>Hello {name || "there"},</p>
      <p>Please verify your email address by clicking the button below:</p>
      <p style={{ textAlign: "center" }}>
        <a href={verificationUrl} className="button">
          Verify Email
        </a>
      </p>
      <p>If you didn't create an account, you can safely ignore this email.</p>
      <p>
        Best regards,
        <br />
        The Hardy Technology Team
      </p>
    </BaseEmailLayout>
  )

  return renderToStaticMarkup(emailContent)
}

export const EventRegistrationEmailTemplate = ({
  name,
  eventName,
  eventDate,
  eventLocation,
  ticketInfo,
}: EventRegistrationEmailTemplateProps): string => {
  const emailContent = (
    <BaseEmailLayout title={`Registration Confirmed: ${eventName}`}>
      <h1>Registration Confirmed!</h1>
      <p>Hello {name || "there"},</p>
      <p>
        Thank you for registering for <strong>{eventName}</strong>. Your registration has been confirmed!
      </p>
      <div style={{ background: "#f5f5f5", padding: "15px", borderRadius: "5px", margin: "20px 0" }}>
        <h2>Event Details</h2>
        <p>
          <strong>Event:</strong> {eventName}
        </p>
        <p>
          <strong>Date:</strong> {eventDate}
        </p>
        <p>
          <strong>Location:</strong> {eventLocation}
        </p>
        <p>
          <strong>Ticket Type:</strong> {ticketInfo.ticketType}
        </p>
        <p>
          <strong>Ticket ID:</strong> {ticketInfo.ticketId}
        </p>
        <p>
          <strong>Price:</strong> ₦{ticketInfo.ticketPrice.toLocaleString()}
        </p>
      </div>
      <p>We look forward to seeing you at the event!</p>
      <p>
        Best regards,
        <br />
        The Hardy Technology Team
      </p>
    </BaseEmailLayout>
  )

  return renderToStaticMarkup(emailContent)
}

export const PaymentConfirmationEmailTemplate = ({
  name,
  paymentAmount,
  paymentDate,
  paymentId,
  itemsPurchased,
}: PaymentConfirmationEmailTemplateProps): string => {
  const emailContent = (
    <BaseEmailLayout title="Payment Confirmation">
      <h1>Payment Confirmation</h1>
      <p>Hello {name || "there"},</p>
      <p>Thank you for your payment. This email confirms that your payment has been processed successfully.</p>
      <div style={{ background: "#f5f5f5", padding: "15px", borderRadius: "5px", margin: "20px 0" }}>
        <h2>Payment Details</h2>
        <p>
          <strong>Amount:</strong> ₦{paymentAmount.toLocaleString()}
        </p>
        <p>
          <strong>Date:</strong> {paymentDate}
        </p>
        <p>
          <strong>Transaction ID:</strong> {paymentId}
        </p>
        <h3>Items Purchased</h3>
        <ul>
          {itemsPurchased.map((item, index) => (
            <li key={index}>
              {item.name} - ₦{item.price.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
      <p>If you have any questions about your payment, please contact our support team.</p>
      <p>
        Best regards,
        <br />
        The Hardy Technology Team
      </p>
    </BaseEmailLayout>
  )

  return renderToStaticMarkup(emailContent)
}

export const CourseEnrollmentEmailTemplate = ({
  name,
  courseName,
  startDate,
  instructorName,
  accessLink,
}: CourseEnrollmentEmailTemplateProps): string => {
  const emailContent = (
    <BaseEmailLayout title={`Welcome to ${courseName}`}>
      <h1>Welcome to {courseName}!</h1>
      <p>Hello {name || "there"},</p>
      <p>
        Thank you for enrolling in <strong>{courseName}</strong>. We're excited to have you join us!
      </p>
      <div style={{ background: "#f5f5f5", padding: "15px", borderRadius: "5px", margin: "20px 0" }}>
        <h2>Course Details</h2>
        <p>
          <strong>Course:</strong> {courseName}
        </p>
        <p>
          <strong>Start Date:</strong> {startDate}
        </p>
        <p>
          <strong>Instructor:</strong> {instructorName}
        </p>
      </div>
      <p>You can access your course materials by clicking the button below:</p>
      <p style={{ textAlign: "center" }}>
        <a href={accessLink} className="button">
          Access Course
        </a>
      </p>
      <p>We hope you enjoy the course and find it valuable for your professional development.</p>
      <p>
        Best regards,
        <br />
        The Hardy Technology Team
      </p>
    </BaseEmailLayout>
  )

  return renderToStaticMarkup(emailContent)
}

export const EventOrganizerNotificationTemplate = ({
  eventName,
  registrantName,
  registrantEmail,
  registrationDate,
  ticketType,
}: EventOrganizerNotificationProps): string => {
  const emailContent = (
    <BaseEmailLayout title={`New Registration for ${eventName}`}>
      <h1>New Event Registration</h1>
      <p>Hello Event Organizer,</p>
      <p>
        A new participant has registered for <strong>{eventName}</strong>.
      </p>
      <div style={{ background: "#f5f5f5", padding: "15px", borderRadius: "5px", margin: "20px 0" }}>
        <h2>Registration Details</h2>
        <p>
          <strong>Event:</strong> {eventName}
        </p>
        <p>
          <strong>Registrant:</strong> {registrantName}
        </p>
        <p>
          <strong>Email:</strong> {registrantEmail}
        </p>
        <p>
          <strong>Registration Date:</strong> {registrationDate}
        </p>
        <p>
          <strong>Ticket Type:</strong> {ticketType}
        </p>
      </div>
      <p>You can view all registrations in your admin dashboard.</p>
      <p>
        Best regards,
        <br />
        The Hardy Technology Platform
      </p>
    </BaseEmailLayout>
  )

  return renderToStaticMarkup(emailContent)
}

// Supabase Auth Email Templates
export const getSupabaseAuthEmailTemplates = (): Record<string, { subject: string; html: string }> => {
  return {
    confirmation: {
      subject: "Confirm Your Email Address",
      html: VerificationEmailTemplate({ verificationUrl: "{{ .ConfirmationURL }}" }),
    },
    magic_link: {
      subject: "Your Magic Link",
      html: renderToStaticMarkup(
        React.createElement(
          BaseEmailLayout,
          { title: "Your Magic Link" },
          React.createElement("h1", null, "Your Magic Link"),
          React.createElement("p", null, "Hello,"),
          React.createElement("p", null, "Click the button below to sign in to your account:"),
          React.createElement(
            "p",
            { style: { textAlign: "center" } },
            React.createElement("a", { href: "{{ .MagicLink }}", className: "button" }, "Sign In"),
          ),
          React.createElement("p", null, "If you didn't request this link, you can safely ignore this email."),
          React.createElement("p", null, "This link will expire in 24 hours."),
          React.createElement("p", null, "Best regards,", React.createElement("br", null), "The Hardy Technology Team"),
        ),
      ),
    },
    recovery: {
      subject: "Reset Your Password",
      html: PasswordResetEmailTemplate({ resetUrl: "{{ .RecoveryURL }}" }),
    },
    invite: {
      subject: "You've Been Invited",
      html: renderToStaticMarkup(
        React.createElement(
          BaseEmailLayout,
          { title: "You've Been Invited" },
          React.createElement("h1", null, "You've Been Invited"),
          React.createElement("p", null, "Hello,"),
          React.createElement(
            "p",
            null,
            "You've been invited to join Hardy Technology. Click the button below to accept the invitation:",
          ),
          React.createElement(
            "p",
            { style: { textAlign: "center" } },
            React.createElement("a", { href: "{{ .InviteURL }}", className: "button" }, "Accept Invitation"),
          ),
          React.createElement("p", null, "If you weren't expecting this invitation, you can safely ignore this email."),
          React.createElement("p", null, "Best regards,", React.createElement("br", null), "The Hardy Technology Team"),
        ),
      ),
    },
    email_change: {
      subject: "Confirm Email Change",
      html: renderToStaticMarkup(
        React.createElement(
          BaseEmailLayout,
          { title: "Confirm Email Change" },
          React.createElement("h1", null, "Confirm Email Change"),
          React.createElement("p", null, "Hello,"),
          React.createElement("p", null, "Click the button below to confirm your new email address:"),
          React.createElement(
            "p",
            { style: { textAlign: "center" } },
            React.createElement("a", { href: "{{ .EmailChangeURL }}", className: "button" }, "Confirm Email Change"),
          ),
          React.createElement("p", null, "If you didn't request this change, please contact support immediately."),
          React.createElement("p", null, "Best regards,", React.createElement("br", null), "The Hardy Technology Team"),
        ),
      ),
    },
  }
}

