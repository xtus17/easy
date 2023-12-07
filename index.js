const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sendNotifications = require("./send-notifications.js");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/modal", (req, res) => {
  res.render("modal");
});

/*
app.post("/send-notifications", async (req, res) => {
  const customBody = req.body.customBody || "EasySos";

  try {
    await sendNotifications(customBody);

    // Muestra un modal de éxito usando SweetAlert2
    await Swal.fire({
      title: "¡Notificaciones enviadas con éxito!",
      text: "La alerta ha sido enviada a todos los usuarios",
      icon: "success",
    });

    // Puedes redirigir o renderizar una nueva vista después del modal
    //res.render("index");
  } catch (error) {
    console.error("Error al enviar notificaciones:", error);

    // Muestra un modal de error usando SweetAlert2
    await Swal.fire({
      title: "Error",
      text: "Hubo un error al enviar las notificaciones",
      icon: "error",
    });

    res.status(500).render("index", { errorMessage: "Error al enviar notificaciones" });
  }
});
*/

app.post("/send-notifications", async (req, res) => {
  const customBody = req.body.customBody || "EasySos";

  try {
    await sendNotifications(customBody);
    res.send("Notificaciones fueron enviadas con éxito");
    /*
    res.render("modal", {
      successMessage: "Las notificaciones fueron enviadas con éxito",
    });
    */
  } catch (error) {
    res.send("Notificaciones no fueron enviadas con éxito", error);
    /*
    res.render("modal", {
      errorMessage: "Las notificaciones no fueron enviadas con éxito",
    });
    res.status(500).send("Error al enviar notificaciones");
    */
  }
});

app.listen(PORT, () => {
  console.log(`Server start in http://localhost:${PORT}`);
});
