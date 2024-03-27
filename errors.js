exports.invalidObjectId = {
  status: 400,
  code: "Wrong id format",
};

exports.profileNotFound = {
  status: 404,
  code: "Profile not found",
};

exports.pageNotFound = {
  status: 404,
  code: "Page not found",
};

exports.serverError = {
  status: 500,
  code: "ServerError",
}