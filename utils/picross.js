const convert = (g) => {
  const grids = JSON.parse(JSON.stringify(g))
  try {
    for (let i = 0; i < grids.length; i++) {
      for (let j = 0; j < grids[i].length; j++) {
        if (grids[i][j] !== 1) {
          grids[i][j] = 0
        }
      }
    }
    return grids
  } catch (error) {
    return null
  }
}

const reverseRowToColumn = (g) => {
  const grids = []
  try {
    for (let i = 0; i < g[0].length; i++) {
      const grid = []
      for (let j = 0; j < g.length; j++) {
        grid.push(g[j][i])
      }
      grids.push(grid)
    }
    return grids
  } catch (error) {
    return null
  }
}

const generateHint = (g) => {
  const grids = JSON.parse(JSON.stringify(g))
  const hints = []
  try {
    grids.forEach((row) => {
      const preRec = row
        .join('')
        .split('0')
        .filter((pr) => {
          if (pr) {
            return pr
          } else {
            return false
          }
        })

      const rec = preRec.map((nums) => {
        return nums
          .split('')
          .map((n) => +n)
          .reduce((p, c) => p + c)
      })
      hints.push(rec)
    })
    return hints
  } catch (error) {
    return [[]]
  }
}

export { convert, generateHint, reverseRowToColumn }
