-- Migration: Create password_resets table for password reset tokens
CREATE TABLE IF NOT EXISTS password_resets (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL
);
