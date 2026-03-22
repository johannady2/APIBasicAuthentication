import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

app.use(express.static("public"));


//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "newIAmCalderon";
const yourPassword = "newjohannapass";
const yourAPIKey = "76eccf33-b206-4e42-a341-882499a422c4";
const yourBearerToken = "c83b0276-4b6d-4b92-a3cb-9e22876b4d35";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});


app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const result = response.data;
    console.log('stringified JSON: '+JSON.stringify(result));
    res.render("index.ejs", { data: 
      JSON.stringify(result)
     });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });

      //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  }

});

app.get("/basicAuth", async (req, res) =>
{
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  try
  {
      const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2",
      {
        auth:
        {
            username: yourUsername,
            password: yourPassword
        },
            params: { yourUsername }
      });
      const result = response.data;
      console.log(result);

      res.render("index.ejs", { data: JSON.stringify(result)});
      }
  catch(error)
  {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
  
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try
  {
      const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5`,
      {
        auth:
        {
            username: yourUsername,
            password: yourPassword
        },
            params: {apiKey : yourAPIKey }
      });
      const result = response.data;
      console.log(result);

      res.render("index.ejs", { data: JSON.stringify(result)});
  }
  catch(error)
  {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }

});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
