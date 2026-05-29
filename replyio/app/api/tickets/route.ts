import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  const { studentName, studentEmail, subject, conversationHistory } = await request.json()

  const ticketCount = await supabase.from('tickets').select('id', { count: 'exact' })
  const count = ticketCount.count || 0
  const ticketNumber = `TK-${String(count + 1).padStart(3, '0')}`

  const { data: ticket, error } = await supabase.from('tickets').insert({
    ticket_number: ticketNumber,
    student_name: studentName,
    student_email: studentEmail,
    subject: subject || 'Support request from chat',
    status: 'open',
    priority: 'medium'
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (conversationHistory && conversationHistory.length > 0) {
    const messages = conversationHistory.map((msg: { role: string, content: string }) => ({
      ticket_id: ticket.id,
      sender_type: msg.role === 'user' ? 'student' : 'bot',
      content: msg.content
    }))
    await supabase.from('messages').insert(messages)
  }

  return NextResponse.json({ ticket })
}
