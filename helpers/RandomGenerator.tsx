import index from "@/app"
import { categories } from "@/constants/functional"

const income = categories.income
const expense = categories.expense
const incomeColors = [
    "#8a3a3a",  // Darker shade of red
    "#5a7f9a",  // Less bright blue
    "#b07a8a",  // Muted pink
    "#3e5b4a",  // Darker green
    "#bfa85a",  // Duller yellow
    "#9aa5b8",  // Muted light blue
  


]
const expenseColors = [
   "#8a7e6f",  // Muted beige
  "purple",  // Less bright teal
  "#a87fdd",  // Softer purple
  "#4d1e6a",  // Darker violet
  "#d1a2a2",  // Subdued pink
  "#3f7a6e" ,
  "#c25d5d"    // Less bright green
]


export const randomCategoryColorGenerator = (categoryName: string) => {
   
    var color = incomeColors[1]

    income.forEach(
        (incomeCategory: string, index: number) => {
            if (incomeCategory == categoryName) {
                color = incomeColors[index]
            }
        }
    )

    expense.forEach(
        (exprnseCategory: string, index: number) => {
            if (exprnseCategory == categoryName) {
                color = expenseColors[index]
            }
        }
    )

    return color
}