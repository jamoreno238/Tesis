import nodemailer from "nodemailer";

export const sendPasswordEmail = async (email, newPassword) => {
  // Configurar el servicio de correo electrónico dependiendo del dominio
  let transporter;

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Configurar el mensaje de correo electrónico
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Recuperación de contraseña",
    text: `Su nueva contraseña es: ${newPassword}`,
  };

  // Enviar el correo electrónico
  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
};


