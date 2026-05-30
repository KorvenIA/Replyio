import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    console.log('API Key exists:', !!process.env.GROQ_API_KEY)
    console.log('Message received:', message)

    // Fetch all documents from Knowledge Base
    const { data: documents, error: docsError } = await supabase
      .from('documents')
      .select('content, name')

    if (docsError) {
      console.error('Error fetching documents:', docsError)
    }

    const documentContext = documents
      ?.map(doc => `From ${doc.name}:\n${doc.content}`)
      .join('\n\n') || 'No documents available'

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
            content: `You are a helpful customer support assistant for an online academy. 
Use this information from the academy's documents to answer questions accurately:

${documentContext}

If the answer is not in the documents, say so honestly and offer general help.`
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

    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not process your request.'
    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
