import Encrypt from "../models/Encrypt.mjs";


class MainController {
    static main(req, res) {
        res.render("home", { style: "home", script: "home"})
    }

    static async createQuiz(req, res) {
        let { quiz } = req.body;
        console.log(quiz);

        quiz = quiz.filter(it => it.question.trim() && it.answers.length > 1);
        
        if (quiz.length === 0) return res.status(400).json({ status: "error", message: 'Nenhuma pergunta válida foi fornecida.' });
        
        try {
            const encryptedQuiz = await Encrypt.encryptJSON(quiz);
            res.json({ status: "success", redirect: `/send-quiz/${encodeURIComponent(encryptedQuiz)}` });
    
        } catch (error) {
            res.status(500).json({ status: "error", message: 'Erro ao processar o quiz.' });
        }
    }

    static sendQuiz(req, res) {
        const url = `http//localhost:3000/quiz/${encodeURIComponent(req.params.encryptedQuiz)}`
        res.render("sendQuiz", { style: "sendQuiz", script: "sendQuiz", url })
    }

    static quiz(req, res) {

    }
}

export default MainController;