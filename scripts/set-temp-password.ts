import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcrypt'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function setPassword() {
  const email = 'mokah@me.com'
  const newPassword = 'Welcome2024!' // Temporary password

  // Hash the password
  const hashedPassword = await bcrypt.hash(newPassword, 10)

  // Update the user's password
  const { data, error } = await supabase
    .from('users')
    .update({ password_hash: hashedPassword })
    .eq('email', email)
    .select()

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('✅ Password set successfully!')
  console.log('\nLogin credentials:')
  console.log(`Email: ${email}`)
  console.log(`Password: ${newPassword}`)
  console.log('\nLogin at: https://mindfulmealplan.com/login')
  console.log('\nPlease change this password after logging in!')
}

setPassword().catch(console.error)
