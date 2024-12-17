import { getLines } from "../utils.tsx";

export function guardGallivant(): number {

    let distinctPositions = 0;


    let lines = getLines('./src/day6/input.txt');

    let inputArray: string[][] = [];

    for(const item of lines){
        inputArray.push(item.split(''));
    }

    let currentPosition = findGuard(inputArray); 

    let shouldExit = false;

    while(!shouldExit){
        let guardDirection = inputArray[currentPosition[0]][currentPosition[1]];
        let nextCharacter = '';

        let nextPosition = getNextPosition(currentPosition,guardDirection);

        // next position is out of the grid, exit
        if(nextPosition[0] < 0 || nextPosition[0] >= inputArray.length
            || nextPosition[1] < 0 || nextPosition[0] >= inputArray[nextPosition[0]].length){
                inputArray[currentPosition[0]][currentPosition[1]] = 'X';
                break;
            }

        nextCharacter = inputArray[nextPosition[0]][nextPosition[1]];

        if(nextCharacter == '#'){
            guardDirection = turnGuardRight(guardDirection);
            nextPosition = getNextPosition(currentPosition,guardDirection);
        }

        // move the guard
        //1. set current index as 'X'
        inputArray[currentPosition[0]][currentPosition[1]] = 'X';

        // next position is out of the grid, exit
        if(nextPosition[0] < 0 || nextPosition[0] >= inputArray.length
            || nextPosition[1] < 0 || nextPosition[0] >= inputArray[nextPosition[0]].length){
                break;
            }

        //2. move the current guard direction to the next position
        inputArray[nextPosition[0]][nextPosition[1]] = guardDirection;

        currentPosition = nextPosition;
    }

    for(let row = 0; row < inputArray.length; row++){
        for(let col =0; col< inputArray[row].length; col++){

            if(inputArray[row][col] == 'X'){
                distinctPositions++;
            }

        }
    }

    return distinctPositions;
}

function findGuard(inputArray: string[][]): number[]{

    let rowIndex = 0;

    for(const row of inputArray){
        for(let col=0; col < row.length; col++) {
            if(['>','^','<','V'].includes(inputArray[rowIndex][col])){
                return [rowIndex,col];
            }
        }
        rowIndex++;
    }

    return [];
}

function turnGuardRight(currentDirection: string): string {

    if(currentDirection == '<'){
        return '^';
    } else if(currentDirection == '^'){
        return '>';
    }  else if(currentDirection == '>'){
        return 'V';
    }  else if(currentDirection == 'V'){
        return '<';
    }

    return '';
}

function getNextPosition(currentPosition: number[], currentDirection: string): number[]{

    if(currentDirection == '>'){
        return [currentPosition[0],currentPosition[1] + 1];
    }else if(currentDirection == '^'){
        return [currentPosition[0]-1,currentPosition[1]];
    } else if(currentDirection == '<'){
        return [currentPosition[0],currentPosition[1]-1];
    } else if(currentDirection == 'V'){
        return [currentPosition[0]+1,currentPosition[1]];
    }
    
    return [];
}