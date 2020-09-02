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

```
O sistemas inicia na tela do crud de Estados.

Sendo que a dois botôes para navegar entre o crud de ESTADOS e crud de CIDADES

ESTADOS:
Com uma tabela para vizualização e filtros e um botão para criação de um novo estado.
Após inserir um estado e ele ser listado, verás as opção de deletar e editar.

OBS: só podera ser deletado um estado que não tenha uma cidade associada.

CIDADES:
Com uma tabela para vizualização e filtros e um botão para criação de uma nova cidade.
Após inserir uma cidade e ela ser listada, verás as opção de deletar e editar.

OBS: Diferente dos estados cidades podem ser excluidas livremente.


Regras Gerais: Nomes ou Siglas de estado e cidade não serão criadas se ja existirem no banco.

```


