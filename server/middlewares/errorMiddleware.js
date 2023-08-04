// error middleware || NEXT function
const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    success: false,
    message: "Something Went Wrong",
    err,
  });
};

export default errorMiddleware;
