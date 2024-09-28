import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import tweetQueue from '@/lib/queue/tweetQueue'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { tweetText, scheduleTime } = await req.json()

  const campaign = await prisma.campaign.create({
    data: {
      userId: session.user.id,
      tweetText,
      scheduleTime: new Date(scheduleTime),
      status: 'SCHEDULED',
    },
  })

  await tweetQueue.add(
    { tweetText: campaign.tweetText },
    { delay: new Date(campaign.scheduleTime).getTime() - Date.now() }
  )

  

} catch (error) {
    logger.error('Error creating campaign:', error);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }

export async function GET() {
    const session = await getServerSession(authOptions)
  
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
  
    const campaigns = await prisma.campaign.findMany({
      where: { userId: session.user.id },
    })
  
} catch (error) {
    logger.error('Error fetching campaigns:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }