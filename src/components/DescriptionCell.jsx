

function DescriptionCell({isEditing, value, onValueChange}) {
// parent (tableRow) should pass DescriptionCell 2 props: isEditing, value --> we can destructure them from props like


  return isEditing ? (
    <td>
        <input type="text" value={value} onChange={(event) => onValueChange(event.target.value)} />
    </td>
  ) : (
    <td>{value}</td>
  )
}

export default DescriptionCell
