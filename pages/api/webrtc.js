import { v4 } from "uuid";

export default (req, res) => {
  res.statusCode = 200;
  res.redirect("/" + v4());
};
