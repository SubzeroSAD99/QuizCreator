import express from "express";
import MainController from "../controllers/MainController.mjs";

const router = express.Router();

router.get("/", MainController.main);
router.post("/", MainController.createQuiz);

router.get("/send-quiz/:encryptedQuiz", MainController.sendQuiz);
router.get("/quiz/:encryptedQuiz", MainController.quiz);
router.post("/quiz", MainController.verifyResps);
export default router;