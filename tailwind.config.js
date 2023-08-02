/** @type {import('tailwindcss').Config} */

import { milaColors } from "./colors"

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": milaColors.blue[400],
        "primary": milaColors.blue[300],
        "primary-light": milaColors.blue[100], 
        "secondary-dark": milaColors.red[400],
        "secondary": milaColors.red[300],
        "secondary-light": milaColors.red[100],
        "secondary-lighter": milaColors.red[50],
        "neutral-darkest": milaColors.gray[400],
        "neutral-dark": milaColors.gray[300],
        "neutral": milaColors.gray[200],
        "neutral-light": milaColors.gray[100],
        "neutral-lighter": milaColors.gray[50],
        "information-dark": milaColors.blue[500],
        "information": milaColors.blue[300],
        "information-light": milaColors.blue[50],
        "success-dark": milaColors.green[500],
        "success": milaColors.green[300],
        "success-light": milaColors.green[50],
        "warning-dark": milaColors.orange[500],
        "warning": milaColors.orange[300],
        "warning-light": milaColors.orange[50],
        "error-dark": milaColors.red[500],
        "error": milaColors.red[300],
        "error-light": milaColors.red[50],
      }
    },
  },
  plugins: [],
}
