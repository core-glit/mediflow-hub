# MediFlow Hub - Hospital Management System

## Project Overview

MediFlow Hub is a comprehensive Hospital Management System (HMS) with integrated CRM functionality. This system provides tools for managing patients, appointments, billing, inventory, and more.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Backend & Database)

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Supabase account and project

### Installation

Follow these steps to run the project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd mediflow-hub

# Step 3: Install the necessary dependencies
npm install

# Step 4: Set up environment variables
# Create a .env file and add your Supabase credentials
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Step 5: Start the development server
npm run dev
```

## Development

### Local Development

You can edit the code using your preferred IDE. The development server supports hot-reloading for instant preview of changes.

### Project Structure

- `/src` - Source code
  - `/components` - Reusable React components
  - `/pages` - Page components
  - `/integrations` - External service integrations (Supabase)
  - `/hooks` - Custom React hooks
- `/public` - Static assets
- `/supabase` - Supabase configuration and migrations

## Deployment

You can deploy this project to various hosting platforms:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Make sure to set up your environment variables in your deployment platform.

## Features

- Patient Management
- Appointment Scheduling
- Billing & Invoicing
- Inventory Management
- Staff Management
- Dashboard & Analytics
- CRM Integration

