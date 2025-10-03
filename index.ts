import os = require("os");
import ts = require("typescript");
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { log } from "console";
import { resourceUsage } from "process";
import prompt from 'prompt-sync';

interface ProteinAmount {
    loggedDate: string;
    amount: number;
}

function todayDate(): string {
    return Date().substring(4,15);
}

async function getTotalTodayProtein(){
    const csvFile = path.join("proteinRecord.csv");
    const amountReport: Map<string,number> = await getReportCSV(csvFile);
    console.log(`Your today protein consumption is ${amountReport.get(todayDate())}`);
}

async function getTotalProtein(){
    const csvFile = path.join("proteinRecord.csv");
    const amountReport: Map<string,number> = await getReportCSV(csvFile);
    amountReport.forEach((amount, loggedDate) => {
        console.log(`${loggedDate}: ${amount}`)
    });
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

function getReportCSV(csvFile: string): Promise<Map<string, number>> {
    return new Promise((resolve,reject) => {
        const overalReport: Map<string, number> = new Map<string, number>();
        fs.createReadStream(csvFile)
        .pipe(csv())
        .on('data', (row: ProteinAmount) => {
            const amountColumn: Number = row.amount;
            const loggedDateColumn: string = row.loggedDate;
            const currentAmount: Number = overalReport.get(loggedDateColumn) ?? 0;
            overalReport.set(loggedDateColumn, Number(amountColumn)! + Number(currentAmount));
            
        })
        .on('end', () => {
            console.log('CSV successfully processed.');
            resolve(overalReport);
        })
        .on('error', (err) => {
            console.error('Error reading or parsing CSV:', err);
            reject(err);
        });
    })
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