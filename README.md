# Rogério Ignácio - Portfólio de Engenharia de Software

Este é o projeto completo do portfólio interativo de Rogério Ignácio, desenvolvido com **React**, **TypeScript**, **Tailwind CSS v4**, **Vite** e **Lucide Icons**.

---

## 🚀 Como Executar o Projeto no Visual Studio Code (VS Code)

### 1. Pré-requisitos
Certifique-se de ter instalado em seu computador:
- **Node.js** (versão 18 ou superior recomendada): [https://nodejs.org](https://nodejs.org)
- **Visual Studio Code**: [https://code.visualstudio.com](https://code.visualstudio.com)

---

### 2. Abrindo o Projeto no VS Code
1. Baixe os arquivos do projeto ou clone o repositório.
2. Abra o **VS Code**.
3. Vá no menu principal em **File (Arquivo) > Open Folder... (Abrir Pasta...)**.
4. Selecione a pasta deste projeto e clique em **Selecionar Pasta**.

---

### 3. Instalando as Dependências
1. No VS Code, abra o Terminal Integrado através do atalho `Ctrl + '` (ou menu **Terminal > New Terminal**).
2. Execute o comando para instalar todos os pacotes necessários:

```bash
npm install
```

---

### 4. Executando em Modo de Desenvolvimento
Para iniciar a aplicação em tempo real com recarregamento automático (Hot Reload):

```bash
npm run dev
```

Após executar, abra o navegador e acesse o endereço indicado no terminal (normalmente `http://localhost:3000` ou `http://localhost:5173`).

---

### 5. Compilando para Produção
Para verificar erros de código ou gerar a versão final para publicação na web:

```bash
# Verificar tipos TypeScript
npm run lint

# Gerar build otimizado de produção
npm run build
```

Os arquivos prontos para hospedagem serão gerados na pasta `dist/`.

---

## 🛠️ Extensões Recomendadas no VS Code
Ao abrir o projeto no VS Code, aceites as recomendações sugeridas no canto inferior ou instale manualmente:
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
- **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- **Vite** (`vitejs.vscode-vite`)

---

## ⚙️ Estrutura do Projeto

```text
/
├── .vscode/               # Configurações do VS Code (Formatador e Extensões)
├── public/                # Arquivos estáticos
├── src/
│   ├── assets/            # Imagens e logotipos
│   ├── App.tsx            # Componente principal e terminal interativo
│   ├── data.ts            # Projetos, certificações e histórico de dados
│   ├── index.css          # Estilos globais e temas Tailwind v4
│   ├── main.tsx           # Ponto de entrada do React
│   └── vite-env.d.ts      # Declarações de tipos Vite
├── index.html             # Estrutura HTML principal
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração TypeScript
└── vite.config.ts         # Configuração do bundler Vite
```
