# Chronos Vault

**🚀 Live Demo:** [https://chronos-vault.onrender.com/](https://chronos-vault.onrender.com/)

A secure digital time capsule application built using Node.js, Express, and MongoDB that allows users to time-lock messages, secure them with a PIN, and completely prevent access until a specified future date.

---

## Features

* **Time-Locked Encryption:** Messages are sealed and cannot be viewed before the user-defined unlock date and time.
* **PIN Security:** Requires a user-created PIN as a secondary layer of authentication to access the hidden message.
* **Intrusion Logging:** Actively tracks and logs unauthorized attempts to open capsules, including early access pings and failed PIN entries.
* **Dark Mode UI:** Provides a fully custom-styled, responsive front-end experience.

---

## Usage Guide

1. **Create a Capsule**
   * Users provide: A secret message, an unlock date and time, and a security PIN.
   * The application then generates a unique, shareable URL token.
2. **Wait for Unlock Time**
   * Until the specified date arrives: Message content remains mathematically hidden. Direct access is strictly blocked. Early access attempts are recorded in the security log.
3. **Authenticate**
   * Once the unlock time has finally passed, the recipient accesses the link and must enter the correct PIN.
4. **Reveal the Message**
   * After successful dual-verification (Time + PIN), the original message is decrypted and displayed to the user.
5. **The "Acid Wash" (Data Destruction)**
   * Once the message has been successfully viewed, the capsule is designed to undergo a digital "acid wash"—permanently scrubbing the payload from the database to ensure single-use viewing and absolute privacy.

---

## Security Design & Real-World Use Cases

### The Security Architecture
Chronos Vault operates on a Zero-Trust, Dual-Gate model:
* **The Time Gate:** The server compares the current timestamp against the capsule's unlock date on every single backend request. This logic executes entirely server-side, making client-side bypasses or clock manipulation impossible.
* **The PIN Gate:** Even if the time-lock clears, the payload remains inaccessible without the creator's secondary PIN.
* **Active Auditing:** The `IntrusionLog` database schema silently records every failed attempt, providing a forensic trail of unauthorized access.

### Where It Can Be Used
* **Digital Wills & Estate Hand-offs:** Securely store critical passwords, seed phrases, or final letters to be accessed only after a specific date in the future.
* **Embargoed Press Releases:** Journalists, companies, or developers can stage sensitive documents or code to become available to the public at an exact, synchronized time.
* **Secure Single-Use Handoffs:** Sharing highly sensitive API tokens or configuration keys that self-destruct (via the acid wash protocol) immediately after being read by the intended developer.
* **Letters to the Future:** Individuals can write messages to their future selves or loved ones for anniversaries, graduations, or personal milestones.

---

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

### Backend Architecture
* **Node.js:** Chosen as the core runtime environment for its non-blocking, event-driven architecture, making it highly efficient for handling asynchronous database read/write operations.
* **Express.js:** Provides the robust routing framework necessary for managing the REST API endpoints (GET and POST requests) and serving the dynamic frontend views.

### Database & Data Management
* **MongoDB:** A flexible, document-based NoSQL database perfectly suited for storing independent capsule records and security logs.
* **Mongoose (ODM):** Acts as the Object Data Modeling layer. It enforces strict schema validation at the application level, ensuring that no capsule can be saved to the database without the required security parameters (timestamps and PINs).

### Frontend & UI
* **EJS (Embedded JavaScript):** A powerful templating engine that allows the Express server to securely inject dynamic backend data (like unique URL tokens and expiration dates) directly into the HTML before sending it to the client's browser.
* **Vanilla CSS3:** All UI elements, layout structures, and the moody dark-mode theme were custom-engineered from scratch, ensuring a lightweight frontend without relying on heavy external CSS frameworks.

---

## Acknowledgments

Inspired by the concept of digital time capsules and secure data vaults.