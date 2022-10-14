Esse projeto se trata da versão 2.0, a versão 1.0 foi deletada (porém pode ser recuperada),
motivo da exclusão por completo:

Foi feita uma refatoração do código inteiro para melhor compreensão;

Antes o código consistia em model/middleware/connect;

Os metodos http get/put/post se encontravam no app.js (arquivo principal do projeto 1.0),
com 3 funções (upload/list/cadastro), já estava com 134 linhas, assim dificultando 
a leitura do código e podendo prejudicar a performance com o decorrer do tempo;

No projeto 2.0, as funcionalidades foram divididas e agora ela podem ser requistadas através de routes.

data do rework do projeto: DD/MM/AAAA 14/10/2022.