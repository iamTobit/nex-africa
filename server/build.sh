#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "📦 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "🗄️ Initializing and seeding database (Supabase / PostgreSQL)..."
python run.py seed-db

echo "✅ Backend build & database setup complete!"

