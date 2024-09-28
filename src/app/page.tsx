import Header from '@/components/Header'
import LoginButton from '@/components/LoginButton'

export default function Home() {
  return (
    <main>
      <Header />
      <div className='p-4'>
        <h2 className='text-xl font-semibold'>Welcome to Your Twitter Automation App</h2>
        <p className='mt-2'>Sign in to start managing your campaigns.</p>
        <LoginButton />
      </div>
    </main>
  )
}