// const passport = require('passport');

// exports.isAuth = (req, res, done) => {
//   return passport.authenticate('jwt');
// };

// exports.sanitizeUser = (user) => {
//   return { id: user.id, role: user.role };
// };

// exports.cookieExtractor = function (req) {
//   let token = null;
//   if (req && req.cookies) {
//     token = req.cookies['jwt'];
//   }
//   //TODO : this is temporary token for testing without cookie
//   token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTAyNjJkMTA1ODMyMjQxMTFmNDUyMSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk1NjcwNDA2fQ.ZGQtgevqtuT1EdNJt_qNw01CEwHSa7tGWJtgF7n6XOU"
//   return token;
// };