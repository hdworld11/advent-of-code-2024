import { getLines } from '../utils.tsx'


export function getOccurrences(): number {

    let allOccurrences = 0;

    let wordSearch = getLines('./src/day4/input.txt');

    // forwards and backwards
    for(let i = 0; i < wordSearch.length; i++){
        allOccurrences += (checkForwards(wordSearch[i]) + checkBackwards(wordSearch[i]));
    }

    // verticals
    allOccurrences += checkVertical(wordSearch);

    // diagonals
    allOccurrences += checkDiaginalsRight(wordSearch) + checkDiaginalsLeft(wordSearch);

    return allOccurrences;

}


function checkForwards(input: string): number {

    let regex = /XMAS/g;

    let occurrences = input.match(regex) ?? [];

    return occurrences.length;
}

function checkBackwards(input: string): number {

    let regex = /SAMX/g;

    let occurrences = input.match(regex) ?? [];

    return occurrences.length;
}

function checkVertical(input: string[]): number {

    let verticalOccurences = 0;

    for(let i = 0; i < input[0].length; i++){
        let verticalString = "";

        for(let k = 0; k < input.length; k++){
            verticalString += input[k][i] ?? "";
        }

        verticalOccurences += checkForwards(verticalString) + checkBackwards(verticalString);
    }

    return verticalOccurences;
}

function checkDiaginalsRight(input: string[]): number {

    let height = input.length;
    let finalCount = 0;
    
    let row = 0;
    let col = 0;

    while(row < height){
        let diagonalString = "";
        let nextRow = row
        let nextCol = col
        
        let nextString: string | null = input[nextRow][nextCol];

        while(nextString != null){

            diagonalString += input[nextRow][nextCol];

            nextRow = nextRow-1;
            nextCol = nextCol+1;

            if(input[nextRow] == undefined){
               nextString = null; 
            } else {
                nextString = input[nextRow][nextCol] ?? null; 
            }
        }

        finalCount += checkForwards(diagonalString) + checkBackwards(diagonalString);

        if(row == height-1){
            col++;
        } else{
            row++;
        }

        if(col == input[row].length){
            break;
        }
    }

    return finalCount;
}

function checkDiaginalsLeft(input: string[]): number {

    let height = input.length;
    let finalCount = 0;
    
    let row = input.length - 1;
    let col = 0;

    while(row >= 0){
        let diagonalString = "";
        let nextRow = row
        let nextCol = col
        
        let nextString: string | null = input[nextRow][nextCol];

        while(nextString != null){

            diagonalString += input[nextRow][nextCol];

            nextRow = nextRow-1;
            nextCol = nextCol-1;

            if(input[nextRow] == undefined){
                nextString = null;
            } else {
                nextString = input[nextRow][nextCol]?? null; 
            }
        }

        finalCount += checkForwards(diagonalString) + checkBackwards(diagonalString);

        if(col < input[row].length - 1){
            col++;
        } else{
            row--;
        }

        if(row < 4){
            break;
        }
    }

    return finalCount;
}

export function checkCrossMas(): number{
    let occurrences = 0;

    let input = getLines('./src/day4/input.txt');

    for(let row = 1; row<input.length-1; row++){

        for(let col = 1; col<input[row].length-1; col++){

            if(input[row][col] != 'A'){
                continue;
            }

            // console.log("row: " + row + ", col: " + col + ", letter: " + input[row][col])

            let topLeft = input[row-1][col-1];
            let topRight = input[row-1][col+1];
            let bottomLeft = input[row+1][col-1];
            let bottomRight = input[row+1][col+1];

            let string1 = topLeft + 'A' + bottomRight;
            let string2 = topRight + 'A' + bottomLeft;

            // console.log("string1: " + string1 + ", string2: " + string2);

            if((string1 == 'MAS' || string1 == 'SAM') && (string2 == 'MAS' || string2 == 'SAM')){
                occurrences++;
            }

            // console.log("Occurences: " + occurrences);
        }
    }

    return occurrences;
}