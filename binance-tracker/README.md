# Binance tracker

Just a Binance portfolio tracker.

### Motivations

1. Wanted to see performance of portfolio over time, not just at this time, without having to manually input each transction in another portfolio app
2. Track how much are currently staked, etc
3. Be able to show these data in a graph

### Main challenges

1. Existing official Binance APIs either are not available or keep changing
2. Have to manually get tokens from existing session to be able to sync as we use non-public APIs

### Tech stack

1. NextJS - FE and BE APIs - all-in-one framework, easy integration with vercel
2. Prisma - ORM, generates types
3. Supabase - DB and Auth, Firebase alternative for postgres, generous free-tier with dashboard

### How to run dev

1. `yarn install`
2. `cp .env.sample .env`
3. Fill in `.env`
4. `yarn dev`
