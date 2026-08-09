# ClipFlow - AI-Powered DSA Progress Tracker

![ClipFlow Banner](https://img.shields.io/badge/ClipFlow-AI%20Powered-purple)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

**Live Demo:** [https://clipflowai.vercel.app](https://clipflowai.vercel.app)

Track your DSA progress across LeetCode and Codeforces with AI-powered insights, goal tracking, and detailed analytics.

---

## ✨ Features

- 🔗 **Multi-Platform Tracking** - Connect LeetCode & Codeforces
- 🤖 **AI Assistant** - Get personalized recommendations (Gemini API)
- 📊 **Analytics Dashboard** - Charts, streaks, and progress tracking
- 🎯 **Goal Setting** - Daily, weekly, and rating goals
- 🌓 **Dark/Light Mode** - Toggle theme preference
- 🛡️ **Admin Dashboard** - User management (admin only)
- 💳 **Pricing Page** - Free / Pro / Team tiers are displayed as a roadmap; billing is **not** integrated

> **Project status:** ClipFlow is an independent student project under active development.
> LeetCode and Codeforces integrations work; CodeChef is partially implemented and disabled in the UI.
> Team/leaderboard features and payment processing are not implemented. Marketing copy on the site
> describes only what is actually built.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- (Optional) Gemini API key for AI features

### 1. Clone the Repository

```bash
git clone https://github.com/saivighnesh2190/clip-flow-ai.git
cd clip-flow-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Encryption (generate a random 32-character string)
ENCRYPTION_KEY=your_32_character_encryption_key
```

### 4. Set Up Supabase Database

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  leetcode_username TEXT,
  codeforces_username TEXT,
  gemini_api_key_encrypted TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Daily stats table
CREATE TABLE IF NOT EXISTS daily_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  leetcode_solved INT DEFAULT 0,
  leetcode_rating INT,
  codeforces_solved INT DEFAULT 0,
  codeforces_rating INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own stats" ON daily_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own stats" ON daily_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own stats" ON daily_stats FOR UPDATE USING (auth.uid() = user_id);

-- Goals table
CREATE TABLE IF NOT EXISTS goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_type TEXT NOT NULL,
  target_value INT NOT NULL,
  current_value INT DEFAULT 0,
  deadline DATE,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own goals" ON goals FOR ALL USING (auth.uid() = user_id);
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── admin/        # Admin dashboard
│   ├── analytics/    # User analytics
│   ├── api/          # API routes
│   ├── checkout/     # Payment page
│   ├── dashboard/    # Main dashboard
│   └── ...
├── components/       # React components
├── lib/              # Utilities & services
│   ├── api/          # External API integrations
│   ├── supabase/     # Supabase client
│   ├── crypto.ts     # Encryption utilities
│   ├── goals.ts      # Goals service
│   ├── profile.ts    # Profile service
│   └── stats.ts      # Stats service
└── ...
```

---

## 🔧 Configuration

### Admin Access

Edit the admin emails in:
- `src/app/admin/page.tsx`
- `src/app/login/page.tsx`
- `src/app/api/admin/route.ts`

```typescript
const adminEmails = ["your-email@example.com"];
```

### AI Features

Users need to add their own Gemini API key in Profile settings. Get a free key at [Google AI Studio](https://makersuite.google.com/app/apikey).

---

## 🚢 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Vercel

Add these in Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ENCRYPTION_KEY`

---

## 🔄 Working from Different PC

**Yes, you can work from any PC!** Here's how:

1. **Clone the repo** on your new PC:
   ```bash
   git clone https://github.com/saivighnesh2190/clip-flow-ai.git
   cd clip-flow-ai
   npm install
   ```

2. **Create `.env.local`** with your environment variables

3. **Make changes and push:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

4. **Vercel auto-deploys** when you push to main branch!

---

## 📝 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Charts | Recharts |
| AI | Google Gemini API |
| Hosting | Vercel |

---

## 📄 License

MIT License - feel free to use this project for learning!

---

## 👤 Author

**N Sai Vighnesh**
- GitHub: [@saivighnesh2190](https://github.com/saivighnesh2190)
- Email: nsv2190@gmail.com
