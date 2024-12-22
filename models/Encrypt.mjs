// models/encryption.js
import { log } from "console";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

class Encrypt {
    // metodo para criptografar o JSON
    static encryptJSON(jsonObj) {
        const jsonString = JSON.stringify(jsonObj);  // Converte o objeto JSON para string
        const iv = crypto.randomBytes(16);           // Cria um vetor de inicialização (IV) aleatório (16 bytes)
        const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv); // Cria o cifrador com AES-256-CBC

        let encrypted = cipher.update(jsonString, 'utf-8', 'base64');  // Criptografa a string em base64
        encrypted += cipher.final('base64');  // Finaliza a criptografia e adiciona o restante dos dados

        return iv.toString('base64') + ':' + encrypted;  // Retorna o IV e o texto criptografado em base64
    }

    // método para descriptografar o JSON
    static decryptJSON(encryptedData) {
        const [ivBase64, encryptedText] = encryptedData.split(':');  // Separa o IV e o texto criptografado
        const iv = Buffer.from(ivBase64, 'base64');  // Decodifica o IV de base64
        const encryptedBuffer = Buffer.from(encryptedText, 'base64');  // Decodifica o texto criptografado de base64

        const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);  // Cria o decifrador com AES-256-CBC

        let decrypted = decipher.update(encryptedBuffer, undefined, 'utf-8');  // Descriptografa o texto
        decrypted += decipher.final('utf-8');  // Finaliza a descriptografia

        return JSON.parse(decrypted);  // Retorna o objeto JSON original
    }
    
    static genSecretKey() {
        const secretKey = crypto.randomBytes(32);  // Gera 32 bytes aleatórios
        return secretKey.toString('hex');           // Retorna em formato hexadecimal
    }
}

export default Encrypt;
