const asyncHandler = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    res.status(error.code || 5000).json({
      success: false,
      message: error.message,
    });
  }
};
