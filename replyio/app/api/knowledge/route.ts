import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse')

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())

  let extractedText = ''
  try {
    const data = await pdfParse(buffer)
    extractedText = data.text || 'Could not extract text'
  } catch (err) {
    extractedText = 'PDF parsing failed'
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: document, error } = await supabase.from('documents').insert({
    name: file.name,
    file_size: `${(file.size / 1024).toFixed(2)} KB`,
    file_type: 'pdf',
    content: extractedText
  }).select().single()

  return error 
    ? NextResponse.json({ error }, { status: 500 })
    : NextResponse.json({ document })
}
