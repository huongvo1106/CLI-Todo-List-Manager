import os = require("os");
import ts = require("typescript");


interface ProteinAmount {
    amount: number;
    loggedDate: string;
}

function autoCalculateDate(): string {
    return Date().substring(4,15);
}

function getTotalDailyProtein(): void {
    
}

const proteinAmountList: ProteinAmount[] = [];

function addProtein(proteinAmount: number): void {
    const newProteinAmount: ProteinAmount = {
        amount: proteinAmount,
        loggedDate: autoCalculateDate(),
    }
    

    proteinAmountList.push(newProteinAmount);
    console.log(`${newProteinAmount.amount} is logged on ${newProteinAmount.loggedDate}.`);

}

addProtein(10)
addProtein(5)
