// utils/api.ts
export async function CreateAccount(body: {
    fullName: string | null;
    email: string | null;
    password: string;
  }) {
    // Your implementation for creating an account goes here
    // For example, you can use fetch or axios to make an API call
    try {
      // Replace this with your actual API call
      const response = await fetch("your_api_endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      // Check for errors in the response and return accordingly
      if (!response.ok) {
        throw new Error("Failed to create account");
      }
  
      return null; // Return null if no error
    } catch (error) {
      console.error("Error creating account:", error);
      return error; // Return the error if there is any
    }
  }
  