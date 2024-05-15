#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 5000;
let myPin = 123;
console.log(chalk.blue("\n \t   Welcome to CoDinG with Arsalan - ATM machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.bgRedBright("Enter your pin code:")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\n pin is correct, login successfully\n"));
    //console.log(`current account balance is: ${myBalance}`)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.bgYellow("Select an operation"),
            choices: ["withdraw Amount", "check balance"]
        }
    ]);
    if (operationAns.operation === "withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "select a withdrawl Method:",
                choices: ["fast cash", "enter amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "fast cash") {
            let fastcashAns = await inquirer.prompt([
                {
                    name: "fastcash",
                    type: "list",
                    message: "select amount:",
                    choices: [1000, 10000, 15000, 20000,]
                }
            ]);
            if (fastcashAns.fastcash > myBalance) {
                console.log(chalk.red("insufficient balance"));
            }
            else {
                myBalance -= fastcashAns.fastcash;
                console.log(`$${fastcashAns.fastcash}  withdraw successfully`);
                console.log(`your remaining balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "enter amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "enter the amount to withdraw:"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log("insufficient balance");
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`$${amountAns.amount} withdraw successfully`);
                console.log(`your remaining balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log(`your account balance is: ${myBalance}`);
    }
}
else {
    console.log(chalk.red("pin is incorrect, try again!"));
}
