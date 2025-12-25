# Book Author - Anchored Waitlist

A waitlist page for the book "Anchored" by Rochelle Trow, built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Backend database and authentication

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Follow the instructions in `SUPABASE_SETUP.md`
   - Create the required database tables
   - Get your Supabase URL and API keys

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials:
     - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

4. Run the development server:
```bash
npm run dev
```

5. Access the waitlist page:
   - [http://localhost:3000/anchored](http://localhost:3000/anchored)

## Features

### Waitlist Page (`/anchored`)
- Mobile-first responsive design
- Form validation
- Supabase integration for storing waitlist entries
- GDPR consent checkbox
- Success message after submission
- No navigation or footer (standalone page)

## Page Structure

- **`/anchored`** - Public waitlist signup page
  - Main content about the book
  - Book cover image placeholder
  - Waitlist signup form
  - Testimonials from early readers

## Deployment

For production deployment to `rochelletrow.com`:
1. Set up Supabase project and configure environment variables
2. Run database migrations (SQL from `SUPABASE_SETUP.md`)
3. Set up environment variables in your hosting platform
4. Build the project: `npm run build`
5. Deploy to your hosting provider (Vercel, Netlify, etc.)
6. Configure the domain to point to `/anchored` route

## Notes

- The book cover image placeholder needs to be replaced with the actual cover image
- LinkedIn links in testimonials are displayed as text (no outbound links as per requirements)

