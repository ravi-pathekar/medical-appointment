This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is a medical appointment scheduling system web application. You can find doctors and schedule an appointment online.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Add environment variables mentioned in `.env.example` file

Open [http://localhost:3000](http://localhost:3000) in your browser.

On the home page user have `Book Appointment`, `Sign In`, `Sign Up` buttons.

Click on `Book Appointment` or `Find a Doctor` button, user will be redirected to "/find-a-doctor" page.

Here user can find documents according to your disease.

There is also "/appointments" page which is a protected route. You need to sign in or sign up to view your appointments.

User can see upcoming, cancelled and completed appointments on this page.

User also have option to cancel any upcoming appointments.


## Architecture

This application is based upon Next.js 14.

Used [Clerk](https://clerk.com/) for user sign in and sign up as it provides inbuilt sign in, sign up form, social login, webhook integration and sdk for backend as well.

Used `date-fns` to manage date related tasks, like displaying dates and days to book slots.

Used `framer-motion` to build smooth interface.


## Inspiration

For the design part, I took inspiration from [Apollo Hospitals](https://www.apollohospitals.com/doctors) website.

## Limitations

I have added filter doctors component but functionality is not working as of now. Will work on that.

Added API routes later as I deployed backend on AWS EC2 and it was running on "http". So, to call the APIs added API routes.
Note: It is just a workaround for now. When I will add ssl certificate and setup nginx or caddy, can remove API routes and directly call the APIs.

Initially I used Github for version control and now pushing it to bitbucket.


## Deploy on Vercel

This application is deployed on vercel.
