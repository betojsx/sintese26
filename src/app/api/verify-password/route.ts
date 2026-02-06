import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ success: false, message: 'Password is required' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Fetch site settings
    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
    })

    const hashedPassword = siteSettings?.projectProtection?.password

    // If no password is set in settings, return error
    if (!hashedPassword) {
      return NextResponse.json(
        { success: false, message: 'No password protection configured' },
        { status: 400 },
      )
    }

    // Compare the provided password with the hashed password
    const isValid = await bcrypt.compare(password, hashedPassword)

    if (isValid) {
      return NextResponse.json({ success: true, message: 'Password verified' }, { status: 200 })
    } else {
      return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 })
    }
  } catch (error) {
    console.error('Password verification error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
