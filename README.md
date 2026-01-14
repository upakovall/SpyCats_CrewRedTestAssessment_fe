
# Spy Cat Agency — Frontend

This repository contains the frontend application for the Spy Cat Agency management system. The interface provides a centralized dashboard for managing feline operatives and tactical missions, fully integrated with a RESTful backend API.

## Tech Stack

* **Framework:** Next.js (App Router)
* **Library:** React
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **Data Fetching:** Native Fetch API

## Spy Cats Management

* **Operational Roster:** View a comprehensive list of all active spy cats.
* **Recruitment:** Interface for adding new cats to the agency.
* **Salary Modification:** Inline editing of cat compensation directly within the dashboard.
* **Decommissioning:** Functionality to remove cats from the active database.
* **Breed Validation:** Automated validation against TheCatAPI (handled via backend integration).

## Getting Started

### Prerequisites

* Node.js 18+
* npm

### Installation

1. Clone the repository.
2. Install dependencies:
```bash
npm install

```



### Development

Start the local development server:

```bash
npm run dev

```

The application will be accessible at: [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

## Backend Configuration

The frontend is pre-configured to communicate with the backend API at:
`http://localhost:8000`

The API base URL is defined in:
`src/lib/api.ts`

Ensure the backend service is active before performing CRUD operations.

## API Integration

* **REST Architecture:** All data synchronization is performed via standard HTTP methods.
* **Error Handling:** The UI includes a global notification system to display backend validation errors (e.g., "Invalid Breed" or "Mission Locked").
* **Strict Typing:** TypeScript interfaces are used throughout the application to match backend models for Cats, Missions, and Targets.
