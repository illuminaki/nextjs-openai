import OpenAI from "openai"; // Importa la biblioteca de OpenAI para interactuar con la API
import { NextResponse } from "next/server"; // Importa NextResponse para manejar las respuestas en Next.js

// Configura la instancia de OpenAI con la clave de API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Se obtiene la clave de la API desde las variables de entorno
});

export async function POST(request) {
  try {
    // Extrae el mensaje enviado en el cuerpo de la solicitud
    const { message } = await request.json();

    // Valida que se haya proporcionado un mensaje
    if (!message) {
      return NextResponse.json(
        { error: "El mensaje es obligatorio" }, // Respuesta en caso de mensaje faltante
        { status: 400 } // Código de estado HTTP 400: Solicitud incorrecta
      );
    }

    // Llama a la API de OpenAI para generar una respuesta basada en el mensaje del usuario
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Modelo utilizado para la generación de texto
      messages: [{ role: "user", content: message }], // Define el contexto del chat con el mensaje del usuario
    });

    // Obtiene la respuesta generada por el modelo o devuelve un mensaje por defecto si no hay respuesta
    const reply = response.choices[0]?.message?.content || "Sin respuesta.";

    // Devuelve la respuesta generada al cliente
    return NextResponse.json({ reply });
  } catch (error) {
    // Registra cualquier error ocurrido durante la solicitud
    console.error("Error al conectar con OpenAI:", error.message);

    // Devuelve una respuesta con un error interno del servidor
    return NextResponse.json(
      { error: "Error en el servidor" }, // Mensaje de error
      { status: 500 } // Código de estado HTTP 500: Error interno del servidor
    );
  }
}
