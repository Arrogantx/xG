import Header from '@/components/Header'
import LoginButton from '@/components/LoginButton'
import Dashboard from '@/components/Dashboard'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import logger from '@/lib/logger';

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <Header />
      <div className='p-4'>
        <h1 className='text-2xl font-bold'>Twitter Automation App</h1>
        {session ? (
          <Dashboard />
        ) : (
          <div>
            <p className='mt-2'>Please sign in to access the dashboard.</p>
            <LoginButton />
          </div>
        )}
      </div>
    </main>
  )
}