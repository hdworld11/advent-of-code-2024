import * as fs from 'fs';

const list1: number[] = [];
const list2: number[] = [];

function constructInput() {
    const inputList1 = fs.readFileSync('./src/day1/input1.txt','utf-8');

    const locationLists = inputList1.split('\n');

    for(const line of locationLists) {
        if (line.trim() !== '') {
            const [num1, num2] = line.trim().split('   ').map(Number);
            list1.push(num1);
            list2.push(num2);
        }
    }

    list1.sort((a,b) => a - b);
    list2.sort((a,b) => a - b);
}

export function getTotalDistanceSum() : number {

    let totalDistance = 0;

    constructInput();

    if(list1.length != list2.length){
        return 0;
    }

    for(let i = 0; i < list1.length; i++) {
        const distance = Math.abs(list1[i] - list2[i]);

        totalDistance += distance;
    }


    return totalDistance;
}