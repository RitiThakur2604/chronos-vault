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
The application is organized using a streamlined approach inspired by the MVC (Model-View-Controller) architecture, keeping data logic strictly separated from presentation.

* `server.js`: The core entry point of the application. It initializes the Express server, establishes the connection to MongoDB Atlas, and handles all RESTful API routing and controller logic.
* `models/` **(Data Layer)**
  * `Capsule.js`: The Mongoose schema defining the strict data structure for each capsule. It handles the required fields for the secret message, the user-generated PIN, and the critical time-lock expiration timestamps.
  * `IntrusionLog.js`: The database schema responsible for recording the metadata of security events, allowing the system to track failed PIN attempts and early-access pings.
* `views/` **(Presentation Layer)**
  * `index.ejs`: The primary landing page featuring the capsule generation form and UI.
  * `auth.ejs`: The secure PIN-entry gateway that acts as the final barrier once the time-lock clears.
  * `locked.ejs`: The deterrent screen displayed to users attempting to access a capsule before its designated unlock date.
  * `view.ejs`: The final destination interface where the decrypted message is revealed to the authorized user.
* `public/`
  * `style.css`: Contains all custom CSS rules, responsive design media queries, and the application's signature dark-mode aesthetics.

---

## Technologies Used

**Backend Architecture**
* **Node.js:** Chosen as the core runtime environment for its non-blocking, event-driven architecture, making it highly efficient for handling asynchronous database read/write operations.
* **Express.js:** Provides the robust routing framework necessary for managing the REST API endpoints (`GET` and `POST` requests) and serving the dynamic frontend views.

**Database & Data Management**
* **MongoDB:** A flexible, document-based NoSQL database perfectly suited for storing independent capsule records and security logs.
* **Mongoose (ODM):** Acts as the Object Data Modeling layer. It enforces strict schema validation at the application level, ensuring that no capsule can be saved to the database without the required security parameters (timestamps and PINs).

**Frontend & UI**
* **EJS (Embedded JavaScript):** A powerful templating engine that allows the Express server to securely inject dynamic backend data (like unique URL tokens and expiration dates) directly into the HTML before sending it to the client's browser.
* **Vanilla CSS3:** All UI elements, layout structures, and the moody dark-mode theme were custom-engineered from scratch, ensuring a lightweight frontend without relying on heavy external CSS frameworks.

## Acknowledgments

Inspired by the concept of digital time capsules and secure data vaults.