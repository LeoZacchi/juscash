# Desafio Fullstack - Manutenção de Leads

Este projeto é uma aplicação fullstack desenvolvida utilizando Node.js para a API e React.js para o frontend. O mecanismo de persistência de dados escolhido foi o LocalStorage do navegador.

## Objetivo do Projeto

A aplicação visa facilitar a gestão de leads. Os usuários devem se cadastrar e fazer login para acessar o dashboard, onde podem cadastrar novas leads.

## Fluxo de Uso:

### Cadastro/Login:

O usuário realiza o cadastro. Após o cadastro, faz o login para acessar o dashboard.

### Dashboard:

No dashboard, os usuários têm a capacidade de cadastrar novas leads.
Após o cadastro, as leads são exibidas, permitindo que cada uma seja movida entre os estados "Cliente em Potencial" >> "Dados Confirmados" e "Dados Confirmados" >> "Análise do Lead".
Essa interação intuitiva é facilitada pelo recurso de arrastar e soltar.

### Logout:

Um botão no dashboard permite ao usuário fazer logout.
Ao fazer logout, todos os dados são removidos do localstorage.

## Instruções para Execução

## 1. API (Node.js)

Navegue até a pasta api e execute o seguinte comando:

### npm install

Isso instalará as dependências necessárias. Em seguida, execute:

### npm start

A API estará disponível em http://localhost:5000.

## 2. GUI (React.js)

Navegue até a pasta gui e execute o seguinte comando:

### npm install

Para iniciar a aplicação React, execute:

### npm start

A aplicação GUI estará disponível em http://localhost:3000.
