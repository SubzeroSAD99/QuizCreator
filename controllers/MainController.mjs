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
        const host = req.headers.referer;
        
        const url = `${host}quiz/${encodeURIComponent(req.params.encryptedQuiz)}`
        res.render("sendQuiz", { style: "sendQuiz", script: "sendQuiz", url })
    }

    static async quiz(req, res) {
        const { encryptedQuiz } = req.params;

        try {
            const decryptedQuiz = await Encrypt.decryptJSON(encryptedQuiz);
    
            res.render("quiz", { style: "quiz", script: "quiz", quiz: decryptedQuiz });
        } catch(err) {
            res.redirect("/");
        }
    }

    static async verifyResps(req, res) {
        const resps = req.body;
        let { origin, referer } = req.headers;
        origin += "/quiz/";

        let rightsAnswersCount = 0;
        
        try {
            const encryptedQuiz = decodeURIComponent(referer.replace(origin, ""));
            const decryptedQuiz = await Encrypt.decryptJSON(encryptedQuiz);
            
            decryptedQuiz.forEach((it, index) => {
                if(it.correct == resps[`resp${index+1}`]) rightsAnswersCount++;
            });

            const percentage = (rightsAnswersCount / decryptedQuiz.length) * 100;
            
            res.render("score", { style: "score", script: "score", questions: decryptedQuiz.length, rightQuestions: rightsAnswersCount, percentage })
        } catch(err) {
            console.log(err);
            res.redirect("/");
        }
    }
}

export default MainController;