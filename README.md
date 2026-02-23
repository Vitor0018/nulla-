# 🎰 Bot de Apostas NULLA

Um bot Discord completo e profissional para gerenciar filas de apostas, estilo NULLA, totalmente em memória e otimizado para rodar em ambientes com recursos limitados.

## 🎯 Características

✅ **Filas Automáticas por Canal** – detecta automaticamente o tipo de fila pelo nome do canal  
✅ **Sistema de Apostas Completo** – criação automática ao completar fila, mediadores, cancelamento  
✅ **PIX com QR Code** – gera QR Code automático para cada aposta  
✅ **Sistema de Mediadores** – cargo dedicado para gerenciar apostas  
✅ **Personalização Dinâmica** – cores, banners (animados), emojis customizáveis por servidor  
✅ **Análise de Popularidade** – cria apenas filas mais usadas automaticamente  
✅ **Histórico e Ranking** – rastreia apostas passadas e ranking de jogadores  
✅ **Leve e Rápido** – **<50MB RAM**, compatível com Discloud (100MB, 0.25 vCPU)  
✅ **Sem Banco de Dados** – tudo em memória, simples e eficiente  
✅ **Help Completo** – documentação formatada em embeds coloridos  

## 📦 Requisitos

- Node.js 16+
- Discord.js v14+
- Token de bot Discord
- Hospedagem (local, VPS ou Discloud)

## 🚀 Instalação

```bash
# 1. Clonar repositório
git clone https://github.com/seu-usuario/bot-apostas-nulla.git
cd bot-apostas-nulla

# 2. Instalar dependências
npm install

# 3. Configurar token
cp .env.example .env
# Edite .env e adicione seu TOKEN do Discord
TOKEN=seu_token_aqui
PREFIX=!

# 4. Rodar bot
npm start
# ou
node index.js
```

## 📂 Estrutura do Projeto

```
/bot
├── commands/          # Comandos do bot
├── events/            # Event handlers (mensagens, botões, etc)
├── services/          # Gerenciamento de estado
├── utils/             # Funções auxiliares
├── index.js           # Arquivo principal
├── config.js          # Configurações
├── package.json       # Dependências
└── .env               # Variáveis de ambiente (NÃO comitar)
```

## 🎮 Comandos Principais

| Comando | Descrição | Uso |
|---------|-----------|-----|
| `!gerarfilas` | Cria filas (apenas as mais usadas) | `!gerarfilas` ou `!gerarfilas todas` |
| `!gerarfilas todas` | Cria todas as 56 filas | `!gerarfilas todas` |
| `!finalizaraposta <id>` | Finaliza aposta (mediador) | `!finalizaraposta bet_1` |
| `!cancelaraposta <id>` | Cancela aposta (mediador) | `!cancelaraposta bet_1` |
| `!setpix <chave>` | Define chave PIX (mediador) | `!setpix chave_aleatoria` |
| `!pix` | Mostra QR Code da aposta | `!pix` |
| `!editar` | Personaliza visual | `!editar color=#ff0000 emoji-mode=🎮` |
| `!ranking` | Mostra ranking de vitórias | `!ranking` |
| `!historico` | Lista apostas passadas | `!historico` |
| `!status` | Mostra filas e apostas ativas | `!status` |
| `!help` | Documentação completa | `!help` |
| `!limpar <n>` | Limpa mensagens | `!limpar 10` |

## 🎯 Tipos de Filas Suportadas

- **Mobile**: `1x1-mobile`, `2x2-mobile`, `3x3-mobile`, `4x4-mobile`
- **Emulador**: `1x1-emu`, `2x2-emu`, `3x3-emu`, `4x4-emu`
- **Misto**: `2x2-misto`, `3x3-misto`, `4x4-misto`
- **Full Soco**: `1x1-full-soco`, `2x2-full-soco`, `3x3-full-soco`, `4x4-full-soco`

## 💰 Sequência de Valores

- **R$ 0,10** → **R$ 10,00** (incremento +0,20)
- **R$ 25,00** → **R$ 100,00** (incremento +15,00)
- **Total: 56 opções de apostas**

## 🎨 Customização

Use `!editar` para personalizar o bot:

```bash
# Mudar cor dos embeds
!editar color=#0099ff

# Enviar banner (PNG/GIF animado)
(anexar arquivo) !editar

# Mudar emojis
!editar emoji-mode=🎮 emoji-value=💰 emoji-players=👤

# Mudar texto dos botões
!editar btn-normal=Entrar btn-infinite=Fixo btn-leave=Sair
```

## ⚙️ Perfil de Recursos

### Requisitos Mínimos
- **RAM**: 100 MB (Discloud)
- **CPU**: 0.25 vCPU (AMD EPYC)
- **Armazenamento**: ~50 MB

### Em Operação
- **Uso Real RAM**: 30-50 MB
- **CPU Médio**: <5% (por requisição)
- **Tempo de Resposta**: <100ms

## 🔧 Configuração Avançada

### .env
```env
TOKEN=seu_token_discord_aqui
PREFIX=!
```

### config.js
Modifique para alterar comportamentos globais como nome do cargo mediador, emojis padrão, cores, etc.

## 🚢 Deploy na Discloud

1. Crie uma conta em [discloud.app](https://discloud.app)
2. Faça upload da pasta `/bot` 
3. Configure as variáveis de ambiente (.env)
4. Bot roda automaticamente com limite de **100MB RAM, 0.25 vCPU**

## 📊 Sistema de Filas Inteligente

- Ao primeiro `!gerarfilas`, o bot cria apenas as filas que já tiveram acessos
- Use `!gerarfilas todas` para forçar todas as 56 opções
- Automaticamente rastreia popularidade de cada valor

## 🔐 Permissões Necessárias

O bot precisa de:
- ✅ Ler mensagens
- ✅ Enviar mensagens
- ✅ Editar mensagens
- ✅ Reagir com emojis
- ✅ Gerenciar roles (cargo Mediador)

## 📝 Notas Importantes

- **Estado em Memória**: Ao reiniciar o bot, todas as filas e apostas em andamento são resetadas
- **Cargo Mediador**: Crie um cargo chamado "Mediador" no Discord para ativar recursos de administrador
- **Chave PIX**: Cada mediador pode ter sua própria chave (armazenada em memória)
- **Sem Banco**: Sem dependência de MongoDB, MySQL ou qualquer DB externo

## 🤝 Contribuições

Pull requests são bem-vindos! Para mudanças grandes, abra uma issue primeiro.

## 📄 Licença

MIT License – veja LICENSE para detalhes.

## 👨‍💻 Suporte

Para dúvidas ou problemas:
1. Confira `!help` no Discord
2. Revise a documentação acima
3. Abra uma issue no GitHub

---

**Versão**: 1.0.0  
**Última atualização**: 22 de Fevereiro de 2026  
**Autor**: Seu Nome  
**Bot estilo**: NULLA (Apostas e Filas)