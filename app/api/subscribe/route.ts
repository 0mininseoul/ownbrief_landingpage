import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: '올바른 이메일 주소를 입력해주세요.',
        },
        { status: 400 }
      )
    }

    // Check for duplicate email
    const { data: existing, error: checkError } = await supabase
      .from('email_subscriptions')
      .select('email')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: '이미 등록된 이메일입니다.',
        },
        { status: 409 }
      )
    }

    // Insert email
    const { error: insertError } = await supabase
      .from('email_subscriptions')
      .insert([
        {
          email,
          source: 'landing_page',
        },
      ])

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return NextResponse.json(
        {
          success: false,
          message: '오류가 발생했습니다. 다시 시도해주세요.',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '알림 신청이 완료되었습니다!',
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      {
        success: false,
        message: '오류가 발생했습니다. 다시 시도해주세요.',
      },
      { status: 500 }
    )
  }
}
