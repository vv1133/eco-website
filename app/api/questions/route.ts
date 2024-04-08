import { NextRequest } from 'next/server';
import { transferSPLToken } from '../../../lib/token_transfer';

type Question = {
  id: number;
  query: string;
  choices: string[];
  answer: string;
};

const questions: Question[] = [
  {
    id: 1,
    query: 'Which of the following energy sources is considered the most environmentally friendly?',
    choices: [
            'A: Coal',
            'B: Oil',
            'C: Solar',
            'D: Natural Gas',
    ],
    answer: 'C'
  },
  {
    id: 2,
    query: 'Which of the following is a common consequence of deforestation?',
    choices: [
            'A: Increased air pollution',
            'B: Loss of habitat for many species',
            'C: Higher rates of urbanization',
            'D: Increased fish populations',
    ],
    answer: 'B'
  },
  {
    id: 3,
    query: 'Which item is most likely to be recyclable?',
    choices: [
            'A: Used batteries',
            'B: Plastic shopping bags',
            'C: Polystyrene foam cups',
            'D: Paint cans',
    ],
    answer: 'B'
  },
];

export async function GET(req: Request) {
  const questionsWithoutAnswers = questions.map(({ answer, ...questionWithoutAnswer }) => questionWithoutAnswer);
  // 将 questions 数组转换为 JSON 并返回
  return new Response(JSON.stringify(questionsWithoutAnswers), {
    status: 200, // OK
    headers: {
      'Content-Type': 'application/json', // 确保响应是以 JSON 格式发送
    },
  });
}

export async function POST(req: Request) {
  const { data } = await req.json();
  let isCorrect = true;
  for (let i = 0; i < data['answers'].length; i++) {
    console.log("answer:"+data['answers'][i]+".."+questions[i].answer);
    if (data['answers'][i][0] !== questions[i].answer) {
      isCorrect = false;
      break;
    }
  }
  let res = {};
  if (isCorrect) {
    if (data['connected'] && data['public_key']) {
      console.log('public_key:'+data['public_key']);
      transferSPLToken(data['public_key']);
      res['answer_result'] = true;
      res['token'] = true;
    } else {
      res['answer_result'] = true;
      res['token'] = false;
    }
  } else {
    res['answer_result'] = false;
    res['token'] = false;
  }

  return Response.json(res);
}

