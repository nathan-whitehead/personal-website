import { Request, Response, NextFunction } from "express";

export const validateContactForm = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, message } = req.body;

  const errors = [];

  if (!name || name.trim() === "") {
    errors.push("Name is required");
  }

  if (!email || !isValidEmail(email)) {
    errors.push("Valid email is required");
  }

  if (!message || message.trim() === "") {
    errors.push("Message is required");
  }

  if (errors.length > 0) {
    console.log("Validation errors:", errors),
      res.status(400).json({
        success: false,
        errors,
      });
    return;
  }
  next();
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
}
