import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.MAIL_USER}`, // replace with your Gmail address
      pass: `${process.env.MAIL_PASS}`, // replace with your Gmail App Password
    },
  });

  try {
    await transporter.sendMail({
      from: 'vanshgambhirag@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Thanks for contacting me!', // subject line
      text: "Thanks for contacting me! I'll get back to you ASAP!", // plain text body
      html: `<p>Thanks ${name} for contacting me with the message: "${message}"! I'll get back to you ASAP!</p>
      <p>I received your message and I'll get back to you ASAP!</p>`, // html body
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}