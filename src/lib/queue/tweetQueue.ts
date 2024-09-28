import Queue from 'bull'
import { TwitterApi } from 'twitter-api-v2'

const tweetQueue = new Queue('tweet-scheduler', process.env.REDIS_URL)

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

tweetQueue.process(async (job) => {
  const { tweetText } = job.data
  await client.v2.tweet(tweetText)
})

export default tweetQueue