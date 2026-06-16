/**
 * PROJETO FINAL - AUTOCOMPLETE COM ÁRVORE TRIE
 * Arquivo: js/main.js
 * Propósito: Gerenciamento de eventos de Interface (DOM) e integração com a Trie.
 */

// --------------------------------------------------------------------------
// 1. MAPEAMENTO DOS ELEMENTOS DO DOM (INTERFACES ACESSÍVEIS)
// --------------------------------------------------------------------------
const trieInput = document.getElementById('trie-input');
const suggestionsList = document.getElementById('suggestions-list');
const clearBtn = document.getElementById('clear-btn');

const wordInput = document.getElementById('word-input');
const addWordBtn = document.getElementById('add-word-btn');
const registeredWordsContainer = document.getElementById('registered-words');

const minhaArvoreTrie = new Trie();

// Palavras iniciais pré-carregadas na Trie (espelhando as tags estáticas do HTML)
['estrutura', 'dados', 'trie'].forEach(p => minhaArvoreTrie.inserir(p));

// --------------------------------------------------------------------------
// 2. FUNÇÕES DE MANIPULAÇÃO DA INTERFACE (UI FUNCTIONS)
// --------------------------------------------------------------------------

/**
 * Renderiza a lista de sugestões gerada pela árvore Trie na tela.
 * @param {Array<string>} sugestoes - Lista de palavras encontradas com o prefixo.
 */
function renderizarSugestoes(sugestoes) {
    // Limpa a lista antes de renderizar
    suggestionsList.innerHTML = '';

    // Se não houver nada digitado ou nenhuma palavra encontrada
    if (!sugestoes || sugestoes.length === 0) {
        const placeholder = document.createElement('li');
        placeholder.classList.add('placeholder');
        placeholder.textContent = trieInput.value.trim() === '' 
            ? 'Aguardando digitação...' 
            : 'Nenhuma sugestão encontrada para este prefixo.';
        suggestionsList.appendChild(placeholder);
        return;
    }

    // Cria os itens da lista dinamicamente
    sugestoes.forEach(palavra => {
        const li = document.createElement('li');
        li.textContent = palavra;
        
        // Evento opcional: Se o usuário clicar na sugestão, joga ela pro input principal
        li.addEventListener('click', () => {
            trieInput.value = palavra;
            renderizarSugestoes([palavra]); // Filtra focando na palavra selecionada
        });

        suggestionsList.appendChild(li);
    });
}

/**
 * Adiciona uma nova tag visual no histórico de palavras cadastradas.
 * @param {string} palavra - Palavra que acabou de ser inserida na Trie.
 */
function adicionarTagVisual(palavra) {
    // Remove o placeholder inicial de texto ("estrutura", "dados", "trie" que estão estáticos no HTML)
    // na primeira inserção real, se achar necessário.
    
    const novaTag = document.createElement('span');
    novaTag.classList.add('tag');
    novaTag.textContent = palavra;

    registeredWordsContainer.appendChild(novaTag);
}

// --------------------------------------------------------------------------
// 3. ESCUTADORES DE EVENTOS (EVENT LISTENERS)
// --------------------------------------------------------------------------

// Evento 1: Captura a digitação em tempo real no campo de busca (Autocomplete)
trieInput.addEventListener('input', (evento) => {
    const prefixo = evento.target.value.trim().toLowerCase();

    if (prefixo === '') {
        renderizarSugestoes([]);
        return;
    }

    const resultados = minhaArvoreTrie.buscar(prefixo);
    renderizarSugestoes(resultados);
});

// Evento 2: Limpa o campo de busca ao clicar no botão "X"
clearBtn.addEventListener('click', () => {
    trieInput.value = '';
    trieInput.focus();
    renderizarSugestoes([]);
});

// Evento 3: Ação de clicar no botão "Inserir" para alimentar a Trie
addWordBtn.addEventListener('click', () => {
    const novaPalavra = wordInput.value.trim().toLowerCase();

    // Validação simples para não aceitar campos vazios
    if (novaPalavra === '') {
        alert('Por favor, digite uma palavra válida.');
        return;
    }

    minhaArvoreTrie.inserir(novaPalavra);

    // Atualiza a interface
    adicionarTagVisual(novaPalavra);
    
    // Reseta o campo de texto do input e joga o foco de volta para ele
    wordInput.value = '';
    wordInput.focus();
});

// Permite submeter a nova palavra apertando a tecla "Enter" dentro do input
wordInput.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        addWordBtn.click();
    }
});