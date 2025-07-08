exports.showHome = (req, res) => {
  res.render("index", { title: "Home Page", message: "Welcome to the Home Page!" });
};

exports.showAbout = (req, res) => {
  res.render("about", { title: "About Us", description: "Learn more about us on this page." });
};

exports.showContact = (req, res) => {
  res.render("contact", { title: "Contact Us", email: "admin@gmail.com" });
};
