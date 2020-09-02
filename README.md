# Front - End Teste ZOOX

## Instalar dependencias
```
yarn install
```

### Compilação em dev
```
yarn serve
```

### Compilação em Prod
```
yarn build
```

### Lints and fixes files
```
yarn lint
```


### Ferramentas utilizadas:
```
Vue, Vuex, Vue routers, moment.js
```

### Configurações

##### Editar o arquivo .env na raiz do projeto e inserir a variavel VUE_APP_BASE_URL, exemplo:
```
VUE_APP_BASE_URL= 'http://localhost:3000'
```
##### Caso queira configurar o endpoint diretamente no axios ir em SRC> config> api.js e alterar a URL default, modelo do arquivo:

```
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost:3000',
  headers: {
    'Cache-Control': 'no-cache',
    'Content-type': 'application/json'
  }
})

export default api
```

### Funcionalidades:

### 1 - LOGIN
##### 1.1 - Criar Acesso 
```
Na tela inicial, a um link para criar acesso, onde devera gerar um nickName e uma senha.
```
##### 1.2 - Login
```
Após criado o acesso com sucesso, basta fazer o login e será authenticado, se tudo der certo será redirecionado para dashboard.
```
### 2 - Dashboard

### 2.1 - Estados
```
A primeira página é a de estados.
Contendo uma tabela om filtros, ordenação e paginação, um botão para criar um novo estado e dois botões na parte superior para transitar entre cidades e estados.

A primeira coisa a se fazer é adicionar um estado, sendo assim atualizando a tabela de vizualização de forma assincrona, dando as opções de atualizar os dados do estado ou deleta-lo, caso adicione uma cidade relacionada ao estado, ele não pode ser deletado apenas atualizado, pois para deleta-lo deve-se antes deletar todas as cidades vinculadas a ele pelo seu Id.
```
### 2.2 - Cidades
```
A segunda página é a de cidades.
Contendo uma tabela com filtros, ordenação e paginação, um botão para criar um novo estado e dois botões na parte superior para transitar entre cidades e estados.

A primeira coisa a se fazer é adicionar uma cidade, sendo assim atualizando a tabela de vizualização de forma assincrona, dando as opções de atualizar os dados da cidade ou deleta-la.
```
### 2.4 - Configurações de acesso
```
Há um botão no canto superior direito, com a label "CONFIGURAÇÕES DE ACESSO".
Nele é possivel modificar a senha de acesso, desconectar-se do sistema voltando para página de login ou até mesmo deletar o acesso atual do banco de dados.
```




