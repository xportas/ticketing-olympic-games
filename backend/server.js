const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const { resolve } = require("path");

const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(express.static(process.env.STATIC_DIR));

app.use(cors());

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { totalPrice } = req.body;
    const paymentAmountInCents = Math.round(totalPrice * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: paymentAmountInCents,
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

const nodemailer = require('nodemailer');
const fs = require('fs');
const pdf = require('html-pdf'); // Asegúrate de instalar esta dependencia

// Configura el transporte de correo
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sproplayerxd@gmail.com',
    pass: process.env.MAIL_PASS
  }
});

app.post('/send-email', (req, res) => {
  let { subject, text, to } = req.body;
  console.log(text);
  if (!subject || !text || !to) {
    return res.status(400).send({ error: 'Todos los campos son obligatorios (asunto, texto, destinatario).' });
  }

  /// Genera el contenido HTML para el PDF
  var htmlContent = `<!DOCTYPE html>
  <html lang="es">
  <head>
  <meta charset="UTF-8">
  <title>Ticket JJOO 2024</title>
  <style>
    body { font-family: Arial, sans-serif; display: flex; }
    .ticket { border: 1px solid #000; padding: 10px; width: 80%; margin: 30px; }
    .header { font-size: 20px; text-align: center; }
    .section { margin-top: 5px; }
    .footer { font-size: 12px; text-align: center; margin-top: 10px; }
  </style>
  </head>
  <body>
  `;

  text.forEach(ticket => {
    htmlContent += `
  <div class="ticket">
    <div class="header"><strong>Ticket de ${ticket["sport"]}</strong></div>
    <div class="section"><strong>Fecha: </strong> ${ticket["date"]}</div>
    <div class="section"><strong>Precio: </strong> ${ticket["price"]}</div>
    <div class="section"><strong>Zona: </strong> ${ticket["zone"]}</div>
    <div class="section"><strong>Número de asiento: </strong> ${ticket["sit"]}</div>
    <div class="section"><strong>Tipo de evento: </strong> ${ticket["type"]}</div>
    <div class="footer">Presenta este ticket en la entrada</div>
  </div>
  `});

  htmlContent += `
  </body>
  </html>
  `;

  // Convierte el contenido HTML a PDF
  pdf.create(htmlContent).toFile('./ticket.pdf', (err, result) => {
    if (err) {
      console.error('Error al crear el archivo PDF:', err);
      return res.status(500).send({ error: 'Error al crear el archivo PDF.' });
    }

    // Configura las opciones del correo
    const mailOptions = {
      from: 'Ticket System <sproplayerxd@gmail.com>',
      to: to,
      subject: subject,
      text: `Estimado cliente,

      ¡Gracias por adquirir entradas para los Juegos Olímpicos de París 2024! Su apoyo es fundamental para el éxito de este evento histórico y estamos encantados de contar con su presencia.
      
      Para que su experiencia sea aún más cómoda y placentera, le recomendamos visitar los siguientes sitios web donde podrá encontrar diversas opciones de alojamiento que se ajusten a sus preferencias y presupuesto:
      
      Parisando: Encuentre una selección de hoteles ideales para los visitantes de los Juegos Olímpicos, desde opciones de lujo hasta alternativas más económicas.
      Olympics.com: La página oficial de los Juegos Olímpicos de París 2024 ofrece información detallada sobre las competiciones y promociones exclusivas de alojamiento y hospitalidad.
      Sortiraparis: Un recurso excelente para descubrir albergues juveniles, campings y hoteles asequibles, perfectos para una estancia económica sin renunciar a la comodidad.
      Your Rentals: Para una experiencia más personalizada, explore la posibilidad de alquilar un apartamento o una casa durante su estancia en la ciudad.
      Le recordamos que las entradas que ha comprado para los eventos están adjuntas a este correo electrónico en formato PDF. Por favor, asegúrese de imprimir o guardar estas entradas en su dispositivo móvil para garantizar su acceso a los eventos.
      
      Si tiene alguna pregunta o necesita asistencia adicional, nuestro equipo de atención al cliente está a su disposición para ayudarle.
      
      Le deseamos una experiencia inolvidable en los Juegos Olímpicos de París 2024.
      
      Cordialmente,
      
      Xabier Portas
      Jefe del Departamento de ventas`,
      html: `<p>Estimado cliente,
      <br><br>
      ¡Gracias por adquirir entradas para los Juegos Olímpicos de París 2024! Su apoyo es fundamental para el éxito de este evento histórico y estamos encantados de contar con su presencia.
      <br><br>
      Para que su experiencia sea aún más cómoda y placentera, le recomendamos visitar los siguientes sitios web donde podrá encontrar diversas opciones de alojamiento que se ajusten a sus preferencias y presupuesto:
      <br><br>
      <br>Parisando: Encuentre una selección de hoteles ideales para los visitantes de los Juegos Olímpicos, desde opciones de lujo hasta alternativas más económicas.
      <br>Olympics.com: La página oficial de los Juegos Olímpicos de París 2024 ofrece información detallada sobre las competiciones y promociones exclusivas de alojamiento y hospitalidad.
      <br>Sortiraparis: Un recurso excelente para descubrir albergues juveniles, campings y hoteles asequibles, perfectos para una estancia económica sin renunciar a la comodidad.
      <br>Your Rentals: Para una experiencia más personalizada, explore la posibilidad de alquilar un apartamento o una casa durante su estancia en la ciudad.
      <br>Le recordamos que las entradas que ha comprado para los eventos están adjuntas a este correo electrónico en formato PDF. Por favor, asegúrese de imprimir o guardar estas entradas en su dispositivo móvil para garantizar su acceso a los eventos.
      <br><br>
      Si tiene alguna pregunta o necesita asistencia adicional, nuestro equipo de atención al cliente está a su disposición para ayudarle.
      <br><br>
      Le deseamos una experiencia inolvidable en los Juegos Olímpicos de París 2024.
      <br><br>
      Cordialmente,
      <br><br>
      Xabier Portas<br>
      Jefe del Departamento de ventas</p>`,
      attachments: [
        {
          filename: 'ticket.pdf',
          path: './ticket.pdf'
        }
      ]
    };

    // Envía el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).send({ error: 'Error al enviar el correo debido a un error del servidor.' });
      } else {
        console.log('Correo enviado:', info.response);
        res.send({ message: '¡Correo enviado exitosamente!' });
      }
    });
  });
});

app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);
