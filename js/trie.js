/**
 * PROJETO FINAL - AUTOCOMPLETE COM ÁRVORE TRIE
 * Arquivo: js/trie.js
 * Propósito: Implementação da estrutura de dados Árvore Trie.
 */

class TrieNode {
    constructor() {
        this.filhos = {};       // Mapa de caractere -> TrieNode filho
        this.fimDePalavra = false; // Marca se este nó é o fim de uma palavra válida
    }
}

class Trie {
    constructor() {
        this.raiz = new TrieNode();
    }

    /**
     * Insere uma palavra na árvore, criando os nós necessários.
     * Complexidade: O(m) onde m = tamanho da palavra.
     * @param {string} palavra
     */
    inserir(palavra) {
        let noAtual = this.raiz;
        for (const char of palavra) {
            if (!noAtual.filhos[char]) {
                noAtual.filhos[char] = new TrieNode();
            }
            noAtual = noAtual.filhos[char];
        }
        noAtual.fimDePalavra = true;
    }

    /**
     * Navega até o nó correspondente ao prefixo informado.
     * Complexidade: O(m).
     * @param {string} prefixo
     * @returns {TrieNode|null}
     */
    _encontrarNo(prefixo) {
        let noAtual = this.raiz;
        for (const char of prefixo) {
            if (!noAtual.filhos[char]) return null;
            noAtual = noAtual.filhos[char];
        }
        return noAtual;
    }

    /**
     * Coleta recursivamente todas as palavras a partir de um nó.
     * @param {TrieNode} no
     * @param {string} prefixoAtual
     * @param {Array<string>} resultados
     */
    _coletarPalavras(no, prefixoAtual, resultados) {
        if (no.fimDePalavra) resultados.push(prefixoAtual);
        for (const [char, filho] of Object.entries(no.filhos)) {
            this._coletarPalavras(filho, prefixoAtual + char, resultados);
        }
    }

    /**
     * Retorna todas as palavras que começam com o prefixo informado.
     * Complexidade: O(m + k) onde k = número de palavras retornadas.
     * @param {string} prefixo
     * @returns {Array<string>}
     */
    buscar(prefixo) {
        const no = this._encontrarNo(prefixo);
        if (!no) return [];
        const resultados = [];
        this._coletarPalavras(no, prefixo, resultados);
        return resultados;
    }
}
