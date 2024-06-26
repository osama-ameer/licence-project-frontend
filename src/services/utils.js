import moment from "moment";

export const generateCode = (project) => {
  let URL = "http://159.65.156.228/demo-script/main.js";

  const scriptConfig = {
    projectId: project?._id,
    url: project?.url,
  };

  return (
    "<script>\n" +
    "(function(d,t) {\n" +
    "const b='" +
    URL +
    "';\n" +
    "const g=d.createElement(t),s=d.getElementsByTagName(t)[0];\n" +
    "g.src=b;\n" +
    "g.defer = true;\n" +
    "g.async = true;\n" +
    "s.parentNode.insertBefore(g,s);\n" +
    "g.onload=function(){\n" +
    "window.$project = " +
    JSON.stringify(scriptConfig) +
    ";\n" +
    "window.initDemo();\n" +
    "};\n" +
    "})(document,'script')\n" +
    "</script>\n"
  );
};

export function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export const getDate = (date) => {
  let newDate = moment(date).format("DD MMMM, YYYY HH:MM:SS ");
  return newDate;
};
