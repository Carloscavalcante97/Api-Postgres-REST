import axios from 'axios';
import apiOpenai from '../ApiOpnai';
import { Response,Request } from 'express';

const endpoint = 'https://api.openai.com/v1/chat/completions';

export default class ChatGptController {
   async gerarDescricao(topicos: string[] ){
    const prompt = topicos.join(', ');
    if(!prompt){
        return "Sem descrição";
    }
    try {
      const response = await apiOpenai.post(endpoint, {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Erro ao gerar descrição:', error);
      throw new Error('Erro ao gerar descrição.');
    }
  }
}
