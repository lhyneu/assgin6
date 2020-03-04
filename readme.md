## Problem Statement

1. As a user, I should be able to add rows to the spreadsheet using a plus button.
2. As a user, I should be able to add columns to the spreadsheet using a plus button.
3. As a user, I should be able to delete rows on the spreadsheet using a minus button.
4. As a user, I should be able to delete columns on the spreadsheet using a minus button.
5. As a user, I should be able to select multiple rows or columns and display their sum in a cell by using a formula. The formula should be of the format "=SUM(START_CELL:END_CELL)". Example "=SUM(A1:A10)" to display the sum of all items from cell A1 to A10. Any changes to the cell content in the selected range should update the sum.
6. As a user, I should be able to perform simple algebraic operations (+, -, *, /) with cell references. Example "=A1+A2".
7. As a user, I should be able to export the sheet as a CSV file.
8. As a user, I should be able to load a CSV from the node server on clicking a load button.

## Your information (Name, NUID, etc)

- Name: Haoyu Lin
- NUID: 001403384

## Technologies used (list down the technologies for the assignment)

Javascript, RxJS

## Requirements (list down any requirements to run your assignment)

1. The goal of this assignment is to learn about JavaScript events & RxJS.
2. Events for the formula should be implemented using RxJS and buttons can use simple event listeners.
3. On clearing formula, all subscribers and events should be cleared from the page.
4. No javascript frameworks should be used except RxJS.
5. No CSS frameworks should be used.
6. Should use ES6 syntax.
7. Should document your code extensively.
8. Should have .gitignore, ReadMe.md files.
9. ReadMe.md file should have markdown with project description and instructions to run the project.

## Steps to run (Step-by-step rundown on how to run your assignment, starting from the git clone step)

```
http-server -p 3001 -d --cors .
```
