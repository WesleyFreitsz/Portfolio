<div align="center">

**Language / Idioma:**
[🇺🇸 English](#-english) · [🇧🇷 Português](#-português)

</div>

---

<div id="-english">

<div align="center">

# 🚀 Wesley Junior — Portfolio

### Fullstack Developer · React · Next.js · Node.js

[![Project Live Here](https://img.shields.io/badge/Live%20Demo-Visit%20Site-7c6ff7?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-eta-plum-95.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

## 📋 About

Personal portfolio built with **Next.js 15** and **TypeScript**, featuring smooth animations, a custom cursor, interactive dot grid, dark/light themes, and a fully functional contact form backed by **Nodemailer**.

## ✨ Features

- **Custom Cursor** — animated ring + dot with hover effects
- **Interactive Grid** — canvas-based dot grid that reacts to mouse movement
- **Typewriter Effect** — animated role titles in the hero section
- **Smooth Scroll** — powered by Locomotive Scroll + GSAP ScrollTrigger
- **Scroll Spy** — floating navigation dots that track the active section
- **Scroll Progress** — top progress bar with gradient glow
- **Dark / Light Theme** — persistent theme toggle with smooth transitions
- **Animated Counters** — numbers count up when the About section enters view
- **Skills Filter** — filter skills by category (Frontend, Backend, Database, Tools)
- **Project Modal** — full-screen modal with project details and tech stack
- **Contact Form** — real email sending via Nodemailer API route (no third-party service)
- **Fully Responsive** — mobile-first layout

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 15, React 18, TypeScript |
| **Styling** | Tailwind CSS v4, CSS Variables |
| **Animations** | GSAP, Framer Motion, Locomotive Scroll |
| **Icons** | Lucide React, React Icons |
| **Backend** | Next.js API Routes, Nodemailer |
| **Fonts** | Syne (display), DM Sans (body) |
| **Deploy** | Vercel |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Email API route
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── about/
│   ├── contact/
│   ├── custom-cursor/
│   ├── footer/
│   ├── grid-background/
│   ├── header/
│   ├── hero/
│   ├── projects/
│   ├── projects-modal/
│   ├── scroll-progress/
│   ├── scroll-spy/
│   ├── skills/
│   ├── smooth-scroll/
│   ├── tech-icons/
│   ├── theme-toggle/
│   └── index.ts
└── contexts/
    ├── scroll-context.tsx
    └── theme-context.tsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/WesleyFreitsz/portfolio.git

# Navigate to the project folder
cd portfolio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Your Gmail address
GMAIL_USER=your@gmail.com

# Google App Password (not your regular password)
# How to generate: myaccount.google.com/security → App passwords
GMAIL_APP_PASSWORD=xxxx_xxxx_xxxx_xxxx
```

> **Note:** You must have 2-Step Verification enabled to generate an App Password.

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📬 Contact Form Setup

The contact form sends two emails on submission:

1. **To you** — with the visitor's name, email, and message
2. **To the visitor** — an automatic confirmation reply

All handled by a Next.js API route at `/api/contact` using Nodemailer + Gmail SMTP. No external email services required.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Made with ❤️ by <a href="https://github.com/WesleyFreitsz">Wesley Junior</a>
</div>

</div>

---

<div id="-português">

<div align="center">

# 🚀 Wesley Junior — Portfólio

### Desenvolvedor Fullstack · React · Next.js · Node.js

[![Projeto ao vivo aqui](https://img.shields.io/badge/Demo%20ao%20Vivo-Visitar%20Site-7c6ff7?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-eta-plum-95.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

## 📋 Sobre

Portfólio pessoal desenvolvido com **Next.js 15** e **TypeScript**, com animações suaves, cursor customizado, grid de pontos interativo, temas escuro/claro e formulário de contato funcional via **Nodemailer**.

## ✨ Funcionalidades

- **Cursor Customizado** — anel animado + ponto com efeito de hover
- **Grid Interativo** — canvas de pontos que reage ao movimento do mouse
- **Efeito Typewriter** — cargos animados na seção hero
- **Smooth Scroll** — Locomotive Scroll + GSAP ScrollTrigger
- **Scroll Spy** — pontos de navegação flutuantes que indicam a seção ativa
- **Progresso de Scroll** — barra superior com gradiente e glow
- **Tema Escuro / Claro** — toggle persistente com transições suaves
- **Contadores Animados** — números que sobem ao entrar na seção Sobre
- **Filtro de Skills** — filtrar por categoria (Frontend, Backend, Banco de Dados, Ferramentas)
- **Modal de Projetos** — modal fullscreen com detalhes e stack tecnológica
- **Formulário de Contato** — envio real de email via API route com Nodemailer
- **Botão WhatsApp** — atalho flutuante para abrir conversa no WhatsApp
- **Totalmente Responsivo** — layout mobile-first

## 🛠️ Stack Tecnológica

| Camada | Tecnologias |
|---|---|
| **Frontend** | Next.js 15, React 18, TypeScript |
| **Estilização** | Tailwind CSS v4, CSS Variables |
| **Animações** | GSAP, Framer Motion, Locomotive Scroll |
| **Ícones** | Lucide React, React Icons |
| **Backend** | Next.js API Routes, Nodemailer |
| **Fontes** | Syne (display), DM Sans (corpo) |
| **Deploy** | Vercel |

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # API route de email
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── about/
│   ├── contact/
│   ├── custom-cursor/
│   ├── footer/
│   ├── grid-background/
│   ├── header/
│   ├── hero/
│   ├── projects/
│   ├── projects-modal/
│   ├── scroll-progress/
│   ├── scroll-spy/
│   ├── skills/
│   ├── smooth-scroll/
│   ├── tech-icons/
│   ├── theme-toggle/
│   ├── whatsapp-button/
│   └── index.ts
└── contexts/
    ├── scroll-context.tsx
    └── theme-context.tsx
```

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/WesleyFreitsz/portfolio.git

# Entrar na pasta do projeto
cd portfolio

# Instalar dependências
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Seu endereço Gmail
GMAIL_USER=seu@gmail.com

# Senha de App do Google (não é sua senha normal!)
# Como gerar: myaccount.google.com/security → Senhas de app
GMAIL_APP_PASSWORD=xxxx_xxxx_xxxx_xxxx
```

> **Atenção:** A Verificação em Duas Etapas precisa estar ativada para gerar a Senha de App.

### Rodando Localmente

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para Produção

```bash
npm run build
npm start
```

## 📬 Configuração do Formulário de Contato

O formulário envia dois emails ao ser submetido:

1. **Para você** — com nome, email e mensagem do visitante
2. **Para o visitante** — uma resposta de confirmação automática

Tudo via API route do Next.js em `/api/contact` usando Nodemailer + Gmail SMTP. Sem serviços externos de email.

## 📄 Licença

Este projeto é open source e está disponível sob a [Licença MIT](LICENSE).

---

<div align="center">
Feito com ❤️ por <a href="https://github.com/WesleyFreitsz">Wesley Junior</a>
</div>

</div>
