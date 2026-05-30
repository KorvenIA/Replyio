import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log('Rating received:', body)

  const { rating, comment, ticketId, ratingType } = body

  if (!rating) {
    console.log('Error: No rating provided')
    return NextResponse.json({ error: 'Rating required' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  console.log('Inserting to Supabase:', { ticketId, ratingType, rating, comment })

  const { data, error } = await supabase.from('ratings').insert({
    ticket_id: ticketId || null,
    rating_type: ratingType || 'email_response',
    rating,
    comment: comment || null
  }).select()

  console.log('Supabase response:', data, error)

  return error
    ? NextResponse.json({ error: error.message }, { status: 500 })
    : NextResponse.json({ success: true })
}
