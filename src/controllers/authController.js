import * as authService from "../services/authService.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await authService.register({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: "success",
    data: user,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await authService.login({ email, password });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: (Number(process.env.JWT_EXPIRES_IN) || 1) * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: "success",
    user,
    token,
  });
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

const me = async (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
};

export { register, login, logout, me };
