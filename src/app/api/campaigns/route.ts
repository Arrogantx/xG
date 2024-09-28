import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

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

  return NextResponse.json(campaign)
}

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const campaigns = await prisma.campaign.findMany({
    where: { userId: session.user.id },
  })

  return NextResponse.json(campaigns)
}
