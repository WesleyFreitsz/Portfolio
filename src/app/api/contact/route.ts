import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email que você recebe
    await transporter.sendMail({
      from: `"Portfólio WJ" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfólio] Nova mensagem de ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0f0d1a; color: #f0eef6; border-radius: 12px;">
          <h2 style="color: #7c6ff7; margin-bottom: 24px;">Nova mensagem do portfólio</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #9490b0; width: 100px; vertical-align: top;">Nome</td>
              <td style="padding: 10px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #9490b0; vertical-align: top;">Email</td>
              <td style="padding: 10px 0;">
                <a href="mailto:${email}" style="color: #a78bfa;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #9490b0; vertical-align: top;">Mensagem</td>
              <td style="padding: 10px 0; line-height: 1.6; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>

          <hr style="border: none; border-top: 1px solid #1e1a35; margin: 24px 0;" />
          <p style="color: #9490b0; font-size: 12px; margin: 0;">
            Respondendo para: <a href="mailto:${email}" style="color: #7c6ff7;">${email}</a>
          </p>
        </div>
      `,
    });

    // Email de confirmação para quem enviou
    await transporter.sendMail({
      from: `"Wesley Junior" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Recebi sua mensagem! ✉️",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0f0d1a; color: #f0eef6; border-radius: 12px;">
          <h2 style="color: #7c6ff7; margin-bottom: 8px;">Olá, ${name}! 👋</h2>
          <p style="color: #9490b0; margin-bottom: 24px;">
            Recebi sua mensagem e entrarei em contato em breve.
          </p>

          <div style="background: #1e1a35; border-radius: 8px; padding: 20px; border-left: 3px solid #7c6ff7;">
            <p style="color: #9490b0; font-size: 12px; margin: 0 0 8px;">Sua mensagem:</p>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #1e1a35; margin: 24px 0;" />
          <p style="color: #9490b0; font-size: 12px; margin: 0;">
            Wesley Junior · Desenvolvedor Fullstack · Londrina - PR
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    return NextResponse.json(
      { error: "Falha ao enviar mensagem. Tente novamente." },
      { status: 500 },
    );
  }
}
