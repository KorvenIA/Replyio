import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()
    
    console.log('API Key exists:', !!process.env.GROQ_API_KEY)
    console.log('Message received:', message)

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `You are a helpful customer support assistant for an online academy.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500
      })
    })

    const data = await response.json()
    console.log('Groq response status:', response.status)
    console.log('Groq response data:', JSON.stringify(data))

    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not process your request.'
    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
