# Chronos Vault

A secure digital time capsule application built using Node.js, Express, and MongoDB that allows users to time-lock messages, secure them with a PIN, and completely prevent access until a specified future date.

## Features

* **Time-Locked Encryption:** Messages are sealed and cannot be viewed before the user-defined unlock date and time.
* **PIN Security:** Requires a user-created PIN as a secondary layer of authentication to access the hidden message.
* **Intrusion Logging:** Actively tracks and logs unauthorized attempts to open capsules, including early access pings and failed PIN entries.
* **Dark Mode UI:** Provides a fully custom-styled, responsive front-end experience.

## Usage

* **Seal a Capsule:**
  Submit a secret message, select an unlock date, and set a PIN using the input form on the home page (`/`). A unique, shareable URL token will be generated.
* **Access the Capsule:**
  Navigate to the shortened URL (e.g., `http://localhost:3000/capsule/:token`). If the time lock is still active, the system will block access and show a locked screen.
* **Unlock the Message:**
  Once the timer expires, enter the correct PIN on the authentication page to successfully decrypt and view the original message.

## File Structure

* `server.js`: Contains the core Express application, routing logic, and database connection handling.
* `models/Capsule.js`: Defines the Mongoose schema for storing the time-locked messages and expiration timestamps.
* `models/IntrusionLog.js`: Defines the Mongoose schema for tracking security events and unauthorized access attempts.
* `views/`: Holds the dynamic EJS templates (`index.ejs`, `auth.ejs`, `locked.ejs`, `view.ejs`) for rendering the HTML pages.

## Technologies Used

* **Node.js and Express.js:** Frameworks used for building the back-end server architecture.
* **MongoDB:** Database used for securely storing capsules and tracking security logs.
* **EJS:** Templating engine used for rendering dynamic, server-side HTML pages.
* **CSS:** Used for styling the dark-mode front-end of the application.

## Acknowledgments

Inspired by the concept of digital time capsules and secure data vaults.