import { getLines } from '../utils.tsx'

const list1: number[] = [];
const list2: number[] = [];

function constructInput() {

    //reset the lists
    list1.length = 0;
    list2.length = 0;

    const locationLists = getLines('./src/day1/input1.txt');

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

export function getSimilarityScore() : number {

    let totalSimilarityScore = 0;

    constructInput();

    let occurenceMapinList = new Map<number,number>();

    for(let i = 0; i < list2.length; i++) {
        let currentOccurence = occurenceMapinList.get(list2[i]) ?? 0;
            occurenceMapinList.set(list2[i], currentOccurence + 1);
    }

    for(let i = 0; i < list1.length; i++) {
        let similarityScore = list1[i] * (occurenceMapinList.get(list1[i]) ?? 0);
        totalSimilarityScore += similarityScore;
    }

    return totalSimilarityScore;
}