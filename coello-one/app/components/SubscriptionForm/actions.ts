"use server";

// server action
export async function subscribeUser(email: string) {
  // to connect to flask backend
  if (process.env.NODE_ENV !== "production") {
    console.log("email submitted", email);
  }
  // Simulate some server work (e.g., saving to DB, sending confirmation email)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return { success: true };
}
