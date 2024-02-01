import formatCurrency from "../utils/formatCurrency"


function RateCell({isEditing, value, onValueChange}) {
  return isEditing ? (
    <td>
        <input type="number" value={value} onChange={(event) => onValueChange(event.target.value)} />
    </td>
  ) : (
    <td>{formatCurrency(value)}/hr</td>
  )
}

export default RateCell
