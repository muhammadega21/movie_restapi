import jwt from "jsonwebtoken";

const generateToken = async (userId) => {
  const payload = { id: userId };
  const days = Number(process.env.JWT_EXPIRES_IN) || 1;

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: `${days}d`,
  });

  return token;
};

export { generateToken };
