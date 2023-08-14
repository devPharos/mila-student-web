export default function CapitalizeWord(word: string): string {
  const firstLetter = word.charAt(0).toUpperCase()
  const remainingLetters = word.substring(1).toLowerCase()

  return firstLetter + remainingLetters
}
