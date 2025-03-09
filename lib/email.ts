export const sendEventSubmissionEmail = async (event: any) => {
  // In a real implementation, you would use a proper email service
  // This is a placeholder showing how you might structure the email sending logic

  console.log(`Sending event submission email to admin for event: ${event.title}`)

  // Example of how you would send an email using a service like Resend
  /*
    const { data, error } = await resend.emails.send({
      from: 'Hardy Technology <no-reply@hardytechnology.xyz>',
      to: [process.env.ADMIN_EMAIL],
      subject: `New Training Event Submission: ${event.title}`,
      html: renderEmailTemplate(EventSubmissionEmailTemplate(event)),
    });

    if (error) throw error;
    */

  console.log("Event submission email sent successfully to admin")
  return { success: true }
}

export const sendEventApprovalEmail = async (event: any, reason?: string) => {
  // In a real implementation, you would use a proper email service
  // This is a placeholder showing how you might structure the email sending logic

  console.log(`Sending event approval email to organizer: ${event.organizerEmail} for event: ${event.title}`)

  // Example of how you would send an email using a service like Resend
  /*
    const { data, error } = await resend.emails.send({
      from: 'Hardy Technology <no-reply@hardytechnology.xyz>',
      to: [event.organizerEmail],
      subject: `Your Training Event "${event.title}" Has Been Approved`,
      html: renderEmailTemplate(EventApprovalEmailTemplate(event)),
    });

    if (error) throw error;
    */

  console.log("Event approval email sent successfully to organizer")
  return { success: true }
}

export const sendEventRejectionEmail = async (event: any, reason?: string) => {
  // In a real implementation, you would use a proper email service
  // This is a placeholder showing how you might structure the email sending logic

  console.log(`Sending event rejection email to organizer: ${event.organizerEmail} for event: ${event.title}`)

  // Example of how you would send an email using a service like Resend
  /*
    const { data, error } = await resend.emails.send({
      from: 'Hardy Technology <no-reply@hardytechnology.xyz>',
      to: [event.organizerEmail],
      subject: `Your Training Event "${event.title}" Has Been Rejected`,
      html: renderEmailTemplate(EventRejectionEmailTemplate(event, reason)),
    });

    if (error) throw error;
    */

  console.log("Event rejection email sent successfully to organizer")
  return { success: true }
}

