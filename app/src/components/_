<template>
    <div class="chess-board">
        <div class="piece" @dragstart="pieceDragEnter" v-for="piece in boardPieces" :style="[{ 'top': `calc(var(--cell-size) * (${piece.rowIndex} + 1) - 82px)` }, { 'left': `calc(var(--cell-size) * ${piece.colIndex})` }]">
            <img :src="getImageUrl(piece.name)" />
        </div>
        <div v-for="(_, colIndex) in 8" class="column">
            <div v-for="(_, rowIndex) in 8" class="cell" :class="[(colIndex + rowIndex) % 2 === 0 ? 'light' : 'dark', selectedPiece.colIndex === colIndex && selectedPiece.rowIndex === rowIndex ? 'selected' : '']"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BoardPiece } from '@types/BoardPiece';
import { reactive, ref } from 'vue';

const pieceDragEnter = (): void => {
    console.log('drag');
};

const boardPieces = ref<BoardPiece[]>([
    { colIndex: 0, name: 'b-rook', playerId: 0, rowIndex: 0 },
    { colIndex: 1, name: 'b-knight', playerId: 0, rowIndex: 0 },
    { colIndex: 2, name: 'b-bishop', playerId: 0, rowIndex: 0 },
    { colIndex: 3, name: 'b-queen', playerId: 0, rowIndex: 0 },
    { colIndex: 4, name: 'b-king', playerId: 0, rowIndex: 0 },
    { colIndex: 5, name: 'b-bishop', playerId: 0, rowIndex: 0 },
    { colIndex: 6, name: 'b-knight', playerId: 0, rowIndex: 0 },
    { colIndex: 7, name: 'b-rook', playerId: 0, rowIndex: 0 },
    { colIndex: 0, name: 'b-pawn', playerId: 0, rowIndex: 1 },
    { colIndex: 1, name: 'b-pawn', playerId: 0, rowIndex: 1 },
    { colIndex: 2, name: 'b-pawn', playerId: 0, rowIndex: 1 },
    { colIndex: 3, name: 'b-pawn', playerId: 0, rowIndex: 1 },
    { colIndex: 4, name: 'b-pawn', playerId: 0, rowIndex: 1 },
    { colIndex: 5, name: 'b-pawn', playerId: 0, rowIndex: 1 },
    { colIndex: 6, name: 'b-pawn', playerId: 0, rowIndex: 1 },
    { colIndex: 7, name: 'b-pawn', playerId: 0, rowIndex: 1 },
    { colIndex: 0, name: 'w-pawn', playerId: 1, rowIndex: 6 },
    { colIndex: 1, name: 'w-pawn', playerId: 1, rowIndex: 6 },
    { colIndex: 2, name: 'w-pawn', playerId: 1, rowIndex: 6 },
    { colIndex: 3, name: 'w-pawn', playerId: 1, rowIndex: 6 },
    { colIndex: 4, name: 'w-pawn', playerId: 1, rowIndex: 6 },
    { colIndex: 5, name: 'w-pawn', playerId: 1, rowIndex: 6 },
    { colIndex: 6, name: 'w-pawn', playerId: 1, rowIndex: 6 },
    { colIndex: 7, name: 'w-pawn', playerId: 1, rowIndex: 6 },
    { colIndex: 0, name: 'w-rook', playerId: 1, rowIndex: 7 },
    { colIndex: 1, name: 'w-knight', playerId: 1, rowIndex: 7 },
    { colIndex: 2, name: 'w-bishop', playerId: 1, rowIndex: 7 },
    { colIndex: 3, name: 'w-queen', playerId: 1, rowIndex: 7 },
    { colIndex: 4, name: 'w-king', playerId: 1, rowIndex: 7 },
    { colIndex: 5, name: 'w-bishop', playerId: 1, rowIndex: 7 },
    { colIndex: 6, name: 'w-knight', playerId: 1, rowIndex: 7 },
    { colIndex: 7, name: 'w-rook', playerId: 1, rowIndex: 7 }
]);

const selectedPiece = reactive<BoardPiece>({ colIndex: -1, name: '', rowIndex: -1 });
const playerId = 1;

const isPieceBetweenInColumn = (colIndex: number, firstIndex: number, secondIndex: number): boolean => {
    const pos = [firstIndex, secondIndex].sort((a, b) => a - b);
    return boardPieces.value[colIndex]?.filter((val, index) => val.name.length && index > pos[0]! && index < pos[1]!).length! > 0;
};

const isPieceBetweenInRow = (rowIndex: number, firstIndex: number, secondIndex: number): boolean => {
    const pos = [firstIndex, secondIndex].sort((a, b) => a - b);
    return boardPieces.value.filter((val, index) => val[rowIndex]?.name.length && index > pos[0]! && index < pos[1]!).length! > 0;
};

const isPieceInDiagonal = (colA: number, rowA: number, colB: number, rowB: number): boolean => {
    if(colB > colA) {
        // droite
        const y = rowA;
        for(let x = colA + 1; x < colB; x++) {
            // action bas ou haut
            const nextY = rowB > rowA ?
                y + (x - colA) :
                y - (x - colA);
            if(boardPieces.value[x]![nextY]!.name.length) return true;
        }
    } else {
        // gauche
        const y = rowA;
        for(let x = colA - 1; x > colB; x--) {
            // action bas ou haut
            const nextY = rowB > rowA ?
                y + (colA - x) :
                y - (colA - x);
            if(boardPieces.value[x]![nextY]!.name.length) return true;
        }
    }
    return false;
};

const isKingCheck = (colIndex: number, rowIndex: number): boolean => {
    /* 1 autour
    diagonales
    lignes
    */
    return false;
};

const isValidMove = (targetColIndex: number, targetRowIndex: number): boolean => {
    const pieceName: string = selectedPiece.name ? selectedPiece.name.split('-')[1]! : '';
    if(pieceName === 'rook') {
        return targetColIndex === selectedPiece.colIndex && !isPieceBetweenInColumn(targetColIndex, selectedPiece.rowIndex!, targetRowIndex) || targetRowIndex === selectedPiece.rowIndex && !isPieceBetweenInRow(targetRowIndex, selectedPiece.colIndex!, targetColIndex);
    } else if(pieceName === 'knight') {
        /*
        haut gauche
        haut droite
        bas gauche
        bas droite
        gauche haut
        gauche bas
        droite haut
        droite bas
        */
        return targetColIndex === selectedPiece.colIndex! - 1 && targetRowIndex === selectedPiece.rowIndex! - 2 || targetColIndex === selectedPiece.colIndex! + 1 && targetRowIndex === selectedPiece.rowIndex! - 2 || targetColIndex === selectedPiece.colIndex! - 1 && targetRowIndex === selectedPiece.rowIndex! + 2 || targetColIndex === selectedPiece.colIndex! + 1 && targetRowIndex === selectedPiece.rowIndex! + 2 ||
        targetColIndex === selectedPiece.colIndex! - 2 && targetRowIndex === selectedPiece.rowIndex! - 1 ||
        targetColIndex === selectedPiece.colIndex! - 2 && targetRowIndex === selectedPiece.rowIndex! + 1 ||
        targetColIndex === selectedPiece.colIndex! + 2 && targetRowIndex === selectedPiece.rowIndex! - 1 ||
        targetColIndex === selectedPiece.colIndex! + 2 && targetRowIndex === selectedPiece.rowIndex! + 1;
    } else if(pieceName === 'bishop') {
        return Math.abs(targetColIndex - selectedPiece.colIndex!) === Math.abs(targetRowIndex - selectedPiece.rowIndex!) && !isPieceInDiagonal(selectedPiece.colIndex!, selectedPiece.rowIndex!, targetColIndex, targetRowIndex);
    } else if(pieceName === 'queen') {
        return targetColIndex === selectedPiece.colIndex && !isPieceBetweenInColumn(targetColIndex, selectedPiece.rowIndex!, targetRowIndex) || targetRowIndex === selectedPiece.rowIndex && !isPieceBetweenInRow(targetRowIndex, selectedPiece.colIndex!, targetColIndex) || !isPieceInDiagonal(selectedPiece.colIndex!, selectedPiece.rowIndex!, targetColIndex, targetRowIndex);
    } else if(pieceName === 'king') {
        /*
        droite
        gauche
        bas
        haut
        haut droite
        haut gauche
        bas droite
        bas gauche
        */
        return (targetColIndex === selectedPiece.colIndex! + 1 && targetRowIndex === selectedPiece.rowIndex || targetColIndex === selectedPiece.colIndex! - 1 && targetRowIndex === selectedPiece.rowIndex || targetRowIndex === selectedPiece.rowIndex! + 1 && targetColIndex === selectedPiece.colIndex || targetRowIndex === selectedPiece.rowIndex! - 1 && targetColIndex === selectedPiece.colIndex || targetColIndex === selectedPiece.colIndex! + 1 && targetRowIndex === selectedPiece.rowIndex! - 1 || targetColIndex === selectedPiece.colIndex! - 1 && targetRowIndex === selectedPiece.rowIndex! - 1 || targetColIndex === selectedPiece.colIndex! + 1 && targetRowIndex === selectedPiece.rowIndex! + 1 || targetColIndex === selectedPiece.colIndex! - 1 && targetRowIndex === selectedPiece.rowIndex! + 1) && !isKingCheck(targetColIndex, targetRowIndex);
    } else if(pieceName === 'pawn') {
        // TODO : pour les 2 cases, verif si pas de piece 1 case au dessus

        /*
        attaque haut droite
        attaque haut gauche
        2 cases
        1 case
        */
        return targetColIndex === selectedPiece.colIndex! + 1 && targetRowIndex === selectedPiece.rowIndex! - 1 && ![undefined, -1].includes(boardPieces.value[selectedPiece.colIndex! + 1]![selectedPiece.rowIndex! - 1]!.playerId!) ||
        targetColIndex === selectedPiece.colIndex! - 1 && targetRowIndex === selectedPiece.rowIndex! - 1 && ![undefined, -1].includes(boardPieces.value[selectedPiece.colIndex! - 1]![selectedPiece.rowIndex! - 1]!.playerId!) ||
        targetColIndex === selectedPiece.colIndex && targetRowIndex === selectedPiece.rowIndex! - 2 && selectedPiece.rowIndex === 6 ||
        targetColIndex === selectedPiece.colIndex && targetRowIndex === selectedPiece.rowIndex! - 1;
    }
    return false;
};

const clickCell = (targetRowIndex: number, targetColIndex: number): void => {
    console.log('Row :', targetRowIndex, 'Col :', targetColIndex);

    // if no selected piece
    if(!selectedPiece.name) {
        // if piece belongs to the player
        if(boardPieces.value[targetColIndex]![targetRowIndex]!.playerId === playerId) {
            boardPieces.value[targetColIndex]![targetRowIndex]!.selected = true;
            selectedPiece.name = boardPieces.value[targetColIndex]![targetRowIndex]!.name;
            selectedPiece.colIndex = targetColIndex;
            selectedPiece.rowIndex = targetRowIndex;
        }
    } else {
        boardPieces.value[selectedPiece.colIndex!]![selectedPiece.rowIndex!]!.selected = false;
        // if not the same as current piece
        if(selectedPiece.colIndex !== targetColIndex || selectedPiece.rowIndex !== targetRowIndex) {
            // if piece belongs to the player
            if(boardPieces.value[targetColIndex]![targetRowIndex]!.playerId === playerId) {
                boardPieces.value[targetColIndex]![targetRowIndex]!.selected = true;
                selectedPiece.name = boardPieces.value[targetColIndex]![targetRowIndex]!.name;
                selectedPiece.colIndex = targetColIndex;
                selectedPiece.rowIndex = targetRowIndex;
            } else {
                if(isValidMove(targetColIndex, targetRowIndex)) {
                    boardPieces.value[targetColIndex]![targetRowIndex]!.name = selectedPiece.name;
                    boardPieces.value[targetColIndex]![targetRowIndex]!.playerId = playerId;
                    boardPieces.value[selectedPiece.colIndex!]![selectedPiece.rowIndex!]!.name = '';
                    boardPieces.value[selectedPiece.colIndex!]![selectedPiece.rowIndex!]!.playerId = -1;
                }
                selectedPiece.name = '';
            }
        } else selectedPiece.name = '';
    }
};

const getImageUrl = (path: string): string => {
    return new URL(`/src/assets/images/pieces/${path}.png`, import.meta.url).href;
};
</script>
