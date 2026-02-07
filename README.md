# Ahaze - Connecting Ethiopia 🇪🇹

Ahaze is a premium professional SaaS platform designed to connect individuals and organizations across Ethiopia. It provides a central hub for social interaction, job searching, event management, and localized commerce.

## 🚀 Features

-   **Account Opening [1]**: Comprehensive professional profiles for individuals.
-   **Organization Registration [2]**: Secure verification and management for businesses and NGOs.
-   **Multi-Type Posts [3]**:
    -   **Normal Posts**: Standard social updates.
    -   **Find Worker**: Targeted job postings with specific requirements.
    -   **Events**: Localized event management and RSVP.
    -   **Market**: Product shelfing and advertising.
    -   **Rent**: Item rental categories (Homes, Machinery, Vehicles, etc.).
    -   **Live**: Real-time agenda-driven broadcasts.
-   **Premium UI/UX**: Built with React 19 and Tailwind CSS v4, following high-end design principles.

## 🛠️ Tech Stack

-   **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons.
-   **Backend**: Supabase (Auth, Database, Storage).
-   **Deployment**: Vercel.

## 🚦 Getting Started

### Prerequisites
-   Node.js (LTS)
-   NPM or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Daanyee/ahazeEthio.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up your environment variables:
    Create a `.env` file and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

### Database Setup
Run the SQL provided in `supabase_schema.sql` in your Supabase SQL Editor to initialize all required tables.

## 🎨 Design System
-   **Typography**: Inter
-   **Primary Color**: `#0070BB` (Blue)
-   **Accent Color**: `#8000FF` (Violet)

---
Built with ❤️ for Ethiopia.
