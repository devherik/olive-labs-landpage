import { useEffect, useState, useMemo } from 'react'
import type { Token } from './terminalData'

export function TerminalTypewriter({ tokens }: { tokens: Token[][] }) {
  const [visibleChars, setVisibleChars] = useState(0)
  const [prevTokens, setPrevTokens] = useState(tokens)

  if (tokens !== prevTokens) {
    setPrevTokens(tokens)
    setVisibleChars(0)
  }

  // Calculate total characters across all tokens
  const totalChars = tokens.reduce(
    (sum, line) => sum + line.reduce((lineSum, token) => lineSum + token.text.length, 0),
    0
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev < totalChars) {
          return prev + 1
        }
        clearInterval(timer)
        return prev
      })
    }, 15) // Adjust typing speed here (ms per character)

    return () => clearInterval(timer)
  }, [tokens, totalChars])

  const renderedLines = useMemo(() => {
    const result: (Token & { start: number; end: number })[][] = []
    let charCounter = 0
    for (let i = 0; i < tokens.length; i++) {
      const line = tokens[i]
      const newLine: (Token & { start: number; end: number })[] = []
      for (let j = 0; j < line.length; j++) {
        const token = line[j]
        const start = charCounter
        const end = charCounter + token.text.length
        charCounter = end
        newLine.push({ ...token, start, end })
      }
      result.push(newLine)
    }
    return result
  }, [tokens])

  return (
    <>
      {renderedLines.map((line, lineIdx) => {
        const isLineVisible = line.some((token) => visibleChars > token.start)
        if (!isLineVisible && lineIdx > 0) return null

        const lineNumStr = String(lineIdx + 1).padStart(2, '0')

        return (
          <div key={lineIdx} className="terminal-code-line">
            <span className="line-number">{lineNumStr}</span>
            <span>
              {line.map((token, tokenIdx) => {
                if (visibleChars <= token.start) return null
                const sliceEnd = Math.min(token.text.length, visibleChars - token.start)
                const textToShow = token.text.slice(0, sliceEnd)
                return (
                  <span key={tokenIdx} className={token.className}>
                    {textToShow}
                  </span>
                )
              })}
            </span>
          </div>
        )
      })}
    </>
  )
}
