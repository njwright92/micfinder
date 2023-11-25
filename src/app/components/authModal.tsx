import React, { useState } from "react";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleAuthMode = () => setIsSignUp(!isSignUp);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        {isSignUp ? (
          <form className="form-container mx-auto">
            <h1 className="text-black text-center">Sign Up</h1>
            <label htmlFor="email" className="label-text">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="input-field"
            />

            <label htmlFor="password" className="label-text">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="input-field"
              autoComplete="current-password"
            />

            <button
              id="signUpButton"
              name="signUpButton"
              type="submit"
              className="auth-button"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form className="form-container">
            <h1 className="text-black text-center">Sign In</h1>
            <label htmlFor="email" className="label-text">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="input-field"
            />

            <label htmlFor="password" className="label-text">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="input-field"
              autoComplete="new-password"
            />

            <button
              id="signInButton"
              name="signInButton"
              type="submit"
              className="auth-button"
            >
              Sign In
            </button>
          </form>
        )}
        <button onClick={toggleAuthMode} className="toggle-mode-button">
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
        <button onClick={onClose} className="close-button">
          &times;
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
