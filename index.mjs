import express from "express";
import exphbs from "express-handlebars";;
import mainRouter from "./routes/mainRouter.mjs";

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use(express.urlencoded({
	extended: true
}));

app.engine("hbs", exphbs.engine({
    extname: "hbs",
    helpers: {
        increment: function(value) {
            return value + 1;
        }
    }
}));

app.set("view engine", "hbs");

app.use("/", mainRouter);

app.listen(3000, () => {
    console.log("Servidor Iniciado!");
});