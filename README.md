# FitHub

FitHub é um aplicativo em React Native desenvolvido para ajudar alunos de academias a gerenciarem seus exercícios. Com uma interface intuitiva e recursos úteis, FitHub é o seu assistente pessoal de fitness.

## Funcionalidades

- **Gerenciamento de Treinos**: Crie, edite e visualize seus treinos personalizados.
- **Biblioteca de Exercícios**: Acesse vídeos de diversos exercícios com instruções detalhadas.
- **Cálculo de IMC e IGC**: Calcule e visualize seu Índice de Massa Corporal (IMC) e Índice de Gordura Corporal (IGC).
- **Citações Motivacionais**: Receba citações diárias para se manter motivado.
- **Perfil do Usuário**: Veja e edite suas informações pessoais.
- **Autenticação**: Login e logout seguro através do Firebase Authentication.
- **Armazenamento de Dados**: Salve e recupere seus dados usando Firebase Firestore.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **Firebase Authentication**: Autenticação de usuários.
- **Firebase Firestore**: Armazenamento de dados em nuvem.
- **Expo**: Plataforma para desenvolvimento rápido de aplicativos React Native.
- **React Navigation**: Navegação entre telas do aplicativo.

## Instalação

### Pré-requisitos

- Node.js
- npm ou yarn
- Expo CLI

### Passos para instalação

1. Clone o repositório:

    ```sh
    git clone https://github.com/seu-usuario/fithub.git
    ```

2. Navegue até o diretório do projeto:

    ```sh
    cd fithub
    ```

3. Instale as dependências:

    ```sh
    npm install
    # ou
    yarn install
    ```

4. Configure o Firebase:

   - Crie um projeto no Firebase.
   - Adicione um aplicativo para Android e/ou iOS.
   - Copie as configurações do Firebase e substitua-as no arquivo `firebaseConfig.js`.

5. Execute o aplicativo:

    ```sh
    expo start
    ```

