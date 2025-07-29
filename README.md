# Array Processing API

A REST API that processes an array of data and returns categorized results including even/odd numbers, alphabets, special characters, sum, and a formatted string.

## Features

- Processes an array of strings containing numbers, alphabets, and special characters
- Returns categorized results including:
  - Even and odd numbers
  - Uppercase alphabets
  - Special characters
  - Sum of all numbers
  - Concatenated string of alphabets in reverse order with alternating caps

## API Endpoint

- **Method:** POST
- **URL:** `/bfhl`
- **Content-Type:** `application/json`

### Request Body

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

### Response

```json
{
  "is_success": true,
  "user_id": "daksh_rana_29072025",
  "email": "daksh.rana@example.com",
  "roll_number": "12345678",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running Locally

```bash
node index.js
```

The server will start on `http://localhost:3000`

### Testing

You can test the API using curl or any API testing tool like Postman.

Example using curl:

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R","$"]}'
```

## Deployment

This API can be deployed to any Node.js hosting platform like:
- Vercel
- Railway
- Render
- Heroku

Make sure to set the `PORT` environment variable if required by your hosting provider.

## Error Handling

The API returns appropriate error responses for invalid inputs:

- Missing or invalid `data` array
- Invalid request format

## License

This project is open source and available under the [MIT License](LICENSE).
