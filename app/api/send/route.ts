// app/api/send/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { nombre, email, servicio, mensaje } = await request.json();

    const data = await resend.emails.send({
      from: 'Compufix Web <onboarding@resend.dev>', // Resend te da este por defecto al inicio
      to: ['compufix.sp@gmail.com'], // Tu mail donde querés recibir las consultas
      subject: `Nueva consulta: ${servicio}`,
      html: `
        <h1>Nueva consulta desde la web</h1>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Servicio:</strong> ${servicio}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}