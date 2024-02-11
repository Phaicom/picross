export function reverseRowToColumn(array2d: any[][]) {
  const reverseArr2d = []

  for (let i = 0; i < array2d[0].length; i++) {
    const arr = []
    for (let j = 0; j < array2d.length; j++)
      arr.push(array2d[j][i])

    reverseArr2d.push(arr)
  }
  return reverseArr2d
}
