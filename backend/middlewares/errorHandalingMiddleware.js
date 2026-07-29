const { ZodError } = require("zod");

const errorHandlingMiddleware = (err, req, res, next) => {
  console.log(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

module.exports = errorHandlingMiddleware;
