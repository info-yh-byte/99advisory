export var COLORS = {
  green: "#1a8a7a",
  greenLight: "#e6f5f2",
  greenPale: "#f4faf8",
  orange: "#e8734a",
  orangeLight: "#fff5f0",
  text: "#222",
  sub: "#666",
  faint: "#999",
  bg: "#fafafa",
  white: "#fff",
  border: "#eaeaea",
  gold: "#c9a84c",
};

export function scrollTo(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export var FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScrqWQ71nMXlCGPwS7uNx-8vA0C_0l3KWEUQfhj-9weSgKW2Q/viewform";

export var DIAG_URL = "https://99advisory.jp/diagnosis/kgi/";
