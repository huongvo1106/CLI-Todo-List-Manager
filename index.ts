import os = require("os");
import ts = require("typescript");
import prompt from 'prompt-sync';
import * as path from 'path';
import * as fs from 'fs';
import { getTotalProtein, getTotalTodayProtein } from './report.js';


export interface ProteinAmount {
    loggedDate: string;
    amount: number;
}

export function todayDate(): string {
    return Date().substring(4,15);
}

const proteinAmountList: ProteinAmount[] = [];

function addProtein(proteinAmount: number): void {
    const newProteinAmount: ProteinAmount = {
        amount: proteinAmount,
        loggedDate: todayDate(),
    }
    proteinAmountList.push(newProteinAmount);
   
    writeToCsv(newProteinAmount);
}

function writeToCsv(data: ProteinAmount): void {
    try {
        const csvFile = path.join("proteinRecord.csv");
        const row: string = String(data.loggedDate) + "," + String(data.amount) + "\n";
        fs.appendFileSync(csvFile,row);
        console.log("Successfully Logged!");
    } catch (error) {
        console.error("Fail log to csv.");
    }
}

// --- Execution function ---
function main():void {
    console.log("Choose your application function:")
    console.log("Type 1 if you want the today report")
    const syncPrompt = prompt();
    const userOption: String | null = syncPrompt("What is your option? ");
    if (userOption === "1") {
       getTotalProtein();
    } else if (userOption === "2") {
        getTotalTodayProtein();         
    } else if (userOption === "3") {
        while(true) {
            const loggedAmount: String | null = syncPrompt("Enter your protein amount: ");
            if (!isNaN(Number(loggedAmount))) {
                addProtein(Number(loggedAmount));
                break;
            }
        }
    } else {
        console.log("Invalid input.");
    }  
}

main();