const VerifySignUp = require("../middleware/verifySignUp");

module.exports = function (app) {
  const AuthController = require("../controllers/AuthController");

  app.post(
    "/api/auth/signup",
    [
      VerifySignUp.checkDuplicateUserNameOrEmail,
      VerifySignUp.checkIfRoleExists,
    ],
    AuthController.signUp
  );
  app.post("/api/auth/signin", AuthController.signIn);

  //User Details
  app.get("/api/auth/users", AuthController.listUsers);
  app.get("/api/auth/user/:id", AuthController.fetchUser);

  //User Roles
  app.post("/api/auth/new/role", AuthController.createUserRole);
  app.get("/api/auth/roles", AuthController.listUserRoles);
  app.get("/api/auth/role/:id", AuthController.fetchUserRole);
};
