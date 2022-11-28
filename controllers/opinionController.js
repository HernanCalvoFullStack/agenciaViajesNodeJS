import { Opinion } from "../models/Opiniones.js";

const guardarOpinion = async (req, res) => {
  // validar
  const { nombre, correo, mensaje } = req.body;

  const errores = [];

  if (nombre.trim() === "" || correo.trim() === "" || mensaje.trim() === "") {
    errores.push("Todos los campos son obligatorios");
  }

  if (errores.length > 0) {
    // Consultar Opiniones Existentes
    const opiniones = await Opinion.findAll();

    // Mostrar la vista con errores
    res.render("opiniones", {
      pagina: "opiniones",
      errores,
      nombre,
      correo,
      mensaje,
      opiniones,
    });
  } else {
    // Almacenar en la Base de Datos
    try {
      await Opinion.create({
        nombre,
        correo,
        mensaje,
      });

      res.redirect("/opiniones");
    } catch (error) {
      console.log(error);
    }
  }
};

export { guardarOpinion };
