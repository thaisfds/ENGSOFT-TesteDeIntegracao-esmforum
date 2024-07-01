const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

/*MEUS TESTES PARA A ATIVIDADE*/

//Cadastro de 3 respostas
test('Testando cadastro de três respostas', () => {
  // Cadastro de uma pergunta para associar respostas
  const idPergunta = modelo.cadastrar_pergunta('2+2?');

  // Cadastro de respostas para a pergunta
  modelo.cadastrar_resposta(idPergunta, '2');
  modelo.cadastrar_resposta(idPergunta, '4');
  modelo.cadastrar_resposta(idPergunta, '6');

  // Recuperação de respostas para a pergunta
  const respostas = modelo.get_respostas(idPergunta);

  // Verificação das respostas
  expect(respostas.length).toBe(3); // Espera 3 respostas
  expect(respostas[0].texto).toBe('2');
  expect(respostas[1].texto).toBe('4');
  expect(respostas[2].texto).toBe('6');
});

//Teste do get_pergunta
test('Testando pegar a pergunta', () => {
  const idPergunta = modelo.cadastrar_pergunta('Qual é a capital do Brasil?');

  const pergunta = modelo.get_pergunta(idPergunta);

  expect(pergunta).toEqual({
    id_pergunta: idPergunta,
    texto: 'Qual é a capital do Brasil?',
    id_usuario: 1
  });
});
