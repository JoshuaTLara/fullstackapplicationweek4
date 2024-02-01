


function HoursCell({isEditing, value, onValueChange}) {


  return isEditing ? (
    <td>
      <input type="number" value={value} onChange={(event) => onValueChange(event.target.value)}/>
    </td>
  ) : (
    <td>{value}</td>
  )

}


export default HoursCell

