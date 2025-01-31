import { POST, GET } from '../src/app/api/chat/route';
import { NextResponse } from 'next/server';

// Mocking PrismaClient properly
jest.mock('@prisma/client', () => {
  const mockFindMany = jest.fn().mockResolvedValue([
    { id: 1, role: 'user', content: 'Hello', createdAt: new Date() },
    { id: 2, role: 'assistant', content: 'Hi there!', createdAt: new Date() },
  ]);

  return {
    PrismaClient: jest.fn(() => ({
      chat: {
        findMany: mockFindMany,
      },
    })),
    mockFindMany, // Exportamos el mock para validarlo en las pruebas
  };
});

// Mocking NextResponse to properly handle JSON responses
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data) => ({ status: data.status || 200, json: () => Promise.resolve(data) })),
  },
}));

describe('Chat API Tests', () => {
  test('GET should return chat history', async () => {
    const request = {};
    const response = await GET(request);
    const json = await response.json();

    // Import the mock to verify calls
    const { mockFindMany } = require('@prisma/client');

    // Ensure that the Prisma `findMany` method was called once
    expect(mockFindMany).toHaveBeenCalledTimes(1);

    // Verify response status and structure
    expect(response.status).toBe(200);
    expect(Array.isArray(json.chats)).toBe(true);
    expect(json.chats.length).toBeGreaterThan(0);

    // Ensure response contains expected fields
    json.chats.forEach((chat) => {
      expect(chat).toHaveProperty('id');
      expect(chat).toHaveProperty('role');
      expect(chat).toHaveProperty('content');
      expect(chat).toHaveProperty('createdAt');
    });
  });
});
