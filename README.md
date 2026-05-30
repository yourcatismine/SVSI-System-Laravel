# SVSI System

SVSI System is a Laravel 12 + Inertia React application for the Sta. Cruz Technical and Vocational School Inc. student portal.

## Repository Structure

- `/system` - Main Laravel application (backend + frontend)
- `/system/resources/js` - Inertia React pages and UI components
- `/system/routes` - Web and auth route definitions
- `/system/tests` - Pest/PHPUnit test suites

## Prerequisites

- PHP 8.2+
- Composer
- Node.js 20+ and npm

## Local Setup

1. Go to the app directory:
   ```bash
   cd /tmp/workspace/yourcatismine/SVSI-System/system
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Install Node dependencies:
   ```bash
   npm install
   ```
4. Create environment file:
   ```bash
   cp .env.example .env
   ```
5. Generate app key:
   ```bash
   php artisan key:generate
   ```
6. Ensure SQLite database file exists:
   ```bash
   touch database/database.sqlite
   ```
7. Run migrations:
   ```bash
   php artisan migrate
   ```

## Development

From `/system`:

- Start Vite dev server:
  ```bash
  npm run dev
  ```
- Start full local dev stack (Laravel server, queue worker, Vite):
  ```bash
  composer run dev
  ```

## Build, Lint, and Test

From `/system`:

- Lint frontend code:
  ```bash
  npm run lint
  ```
- Build frontend assets:
  ```bash
  npm run build
  ```
- Run backend tests:
  ```bash
  php artisan test
  ```

## Default Routes

- `/` - Welcome page
- `/dashboard` - Student dashboard
