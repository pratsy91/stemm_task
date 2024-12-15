const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/dogs", async (req, res) => {
  const breed = req.query.breed;
  const url = breed
    ? `https://api.thedogapi.com/v1/images/search?breed_ids=${breed}`
    : `https://api.thedogapi.com/v1/images/search`;

  try {
    /**
     * Steps to Generate an API Key for The Dog API (Free):
     * 1. Go to https://thedogapi.com/.
     * 2. Click on get your api key.
     * 3. Register for a free account.
     * 4. Your api will be mailed to you.
     * 4. Save the API key securely. Store it in a `.env` file (DOG_API_KEY=your_api_key).
     */
    const response = await axios.get(url, {
      headers: { "x-api-key": process.env.DOG_API_KEY },
    });

    if (response.data.length === 0) {
      return res
        .status(404)
        .json({ error: "No dog data found for the specified breed" });
    }

    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data.message || "Error from Dog API" });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/**
 * Example Requests:
 * - GET http://localhost:3000/api/dogs
 *   (Fetches random dog data)
 * - GET http://localhost:3000/api/dogs?breed=1
 *   (Fetches dog data filtered by breed ID)
 */

/**
* Key Acronyms and Terms for API Maintenance and Security:
* 1. API Token/Key: A unique identifier used to authenticate API requests.
* 2. Rate Limiting: Restricting the number of requests a client can make within a given time to
prevent abuse.
* 3. CORS (Cross-Origin Resource Sharing): A security feature that controls how resources are shared
across origins.
* 4. HTTPS: Ensures secure communication between the client and server by encrypting the data.
* 5. Authentication and Authorization:
* - Authentication verifies the identity of a user (e.g., using API tokens).
* - Authorization determines what actions a user is allowed to perform.
* 6. Environment Variables: Securely store sensitive information like API keys using environment
variables.
* 7. Error Handling: Properly handle and log errors to improve debugging and user experience.
* 8. API Documentation: Document endpoints, methods, parameters, and response formats using
tools like Swagger or Postman.
* 9. Logging and Monitoring: Track API usage, performance, and errors using tools like Datadog or
Loggly.
*/
