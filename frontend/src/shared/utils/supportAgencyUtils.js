export const getErrorMessage = (error) => {
  const message = error?.response?.data?.message || error?.message;

  if (!message) return "No error message was provided by the server.";
  return typeof message === "string" ? message : JSON.stringify(message);
};
