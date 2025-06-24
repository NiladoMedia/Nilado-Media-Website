import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, company, email, project, services, budget, source } = body;

  try {
    // Send to NILADO
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project:</strong> ${project}</p>
        <p><strong>Services:</strong> ${services.join(", ")}</p>
        <p><strong>Budget:</strong> ${budget} e</p>
        <p><strong>Found us via:</strong> ${source}</p>
      `,
    });

    // Auto-reply to client
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: "Thanks for reaching out to NILADO",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for contacting us at NILADO Media. Our team has received your message and will get back to you shortly.</p>
        <p>In the meantime, feel free to check out our work at <a href="https://niladomedia.com">niladomedia.com</a>.</p>
        <p>— The NILADO Team</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error });
  }
}
