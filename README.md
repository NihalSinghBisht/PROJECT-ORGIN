# Node.js/Express Authentication Setup Guide

This project adds a backend authentication system using Node.js, Express, and Passport.js (with Google OAuth & Local login options).

## Features
- Local Username/Password login
- Google OAuth 2.0 login
- Session-based authentication

## Setup Steps

1. **Install dependencies**

    ```bash
    npm install
    ```

2. **Google OAuth Setup**
    - Go to https://console.developers.google.com/
    - Register a new OAuth 2.0 Client ID
    - Set Authorized redirect URI to: `http://localhost:3000/auth/google/callback`
    - Save Client ID and Client Secret
    - Add them to a `.env` file:
        ```
        GOOGLE_CLIENT_ID=your-google-client-id
        GOOGLE_CLIENT_SECRET=your-google-client-secret
        SESSION_SECRET=your-random-session-secret
        ```

3. **Start the backend:**
    ```bash
    node server.js
    ```

4. **Frontend Integration**
    - Point your HTML form to submit to `/login`
    - Use the Google login button that links to `/auth/google`

5. **Access Main Website**
    - After successful login, you will be redirected to `/dashboard` (can be changed)

---

### Directory structure (after backend set up)

```
Origin_team/
  |-- server.js
  |-- auth.js
  |-- userStore.js
  |-- .env
  |-- package.json
  |-- ... (existing frontend files)
```
