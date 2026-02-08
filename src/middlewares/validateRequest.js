const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formatted = result.error.format();
      const errors = {};

      Object.entries(formatted).forEach(([key, value]) => {
        if (value?._errors?.length > 0) {
          errors[key] = value._errors[0];
        }
      });

      return res.status(400).json({
        message: "Validator error",
        errors,
      });
    }
    next();
  };
};

export { validateRequest };
