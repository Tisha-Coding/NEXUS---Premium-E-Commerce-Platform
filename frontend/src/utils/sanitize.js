import DOMPurify from "dompurify";

// Sanitize HTML content (removes XSS attacks)
export const sanitizeHTML = (html) => {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
};

// Sanitize plain text input (removes HTML tags)
export const sanitizeInput = (input) => {
  if (!input) return "";
  return input
    .replace(/[<>]/g, "") // Remove angle brackets
    .trim();
};

// Sanitize email
export const sanitizeEmail = (email) => {
  if (!email) return "";
  return email.toLowerCase().trim();
};

// Sanitize search queries
export const sanitizeSearch = (search) => {
  if (!search) return "";
  return search
    .replace(/[<>]/g, "")
    .trim()
    .substring(0, 100); // Limit length
};

// Sanitize product name/description
export const sanitizeText = (text) => {
  if (!text) return "";
  return text
    .replace(/[<>]/g, "")
    .trim();
};

// Sanitize numeric input
export const sanitizeNumber = (num) => {
  const parsed = parseFloat(num);
  return isNaN(parsed) ? 0 : parsed;
};

// Sanitize phone number
export const sanitizePhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/[^\d]/g, "").substring(0, 10);
};

// Sanitize URL
export const sanitizeURL = (url) => {
  try {
    const urlObj = new URL(url);
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return "";
    }
    return urlObj.toString();
  } catch (e) {
    return "";
  }
};

// Validate and sanitize entire object
export const sanitizeObject = (obj) => {
  const sanitized = {};
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === "number") {
      sanitized[key] = sanitizeNumber(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};
