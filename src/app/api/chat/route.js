import OpenAI from "openai";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';  // Import PrismaClient to interact with the database

// Initialize a new PrismaClient instance
const prisma = new PrismaClient();

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST method to handle incoming chat messages
export async function POST(request) {
  try {
    // Parse JSON body from the incoming request
    const { message } = await request.json();

    // If no message is provided, return a 400 Bad Request response
    if (!message) {
      return NextResponse.json(
        { error: "El mensaje es obligatorio" }, // Message is required
        { status: 400 }
      );
    }

    // Call OpenAI API to generate a response based on the user's message
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    // Extract reply from the response, or use default if none found
    const reply = response.choices[0]?.message?.content || "Sin respuesta.";

    // Store the user's message in the database
    await prisma.chat.create({
      data: {
        role: 'user',
        content: message
      }
    });

    // Store the assistant's reply in the database
    await prisma.chat.create({
      data: {
        role: 'assistant',
        content: reply
      }
    });

    // Return the assistant's reply as JSON response
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error al conectar con OpenAI:", error.message);
    // Return a 500 Internal Server Error response in case of failure
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}

// GET method to retrieve stored chat history
export async function GET(request) {
  try {
    // Fetch all chat records from the database, ordered by creation date ascending
    const chats = await prisma.chat.findMany({
      orderBy: { createdAt: 'asc' }
    });

    // Return the chat history as JSON
    return NextResponse.json({ chats });
  } catch (error) {
    console.error("Error al obtener chats:", error.message);
    // Return a 500 Internal Server Error response in case of failure
    return NextResponse.json(
      { error: "Error al obtener chats" },
      { status: 500 }
    );
  }
}
