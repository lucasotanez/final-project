export default function ItemEntry(name : string, date : string, count : string) {

  let removeBtn : JSX.Element;
  let dateEntry : JSX.Element;

  // Check if items are expired and choose UI (colors) accordingly
  if (new Date().getTime() > new Date(date).getTime()) {
    // Color date & remove button red
    removeBtn = 
      (<td><button className="rounded w-8 h-8 border-red-700
      bg-red-300 border-2 font-extrabold text-red-700">&#9148;</button></td>);
    dateEntry = (<td className="text-red-700">{date}</td>);
  } else {
    // Color remove button default
    removeBtn = 
      (<td><button className="rounded w-8 h-8 border-purple-700
      bg-purple-300 border-2 font-extrabold text-purple-700">&#9148;</button></td>);
    dateEntry = (<td>{date}</td>);
  }

  return (
    <tr>
      { removeBtn }
      <td>{name}</td>
      { dateEntry }
      <td>{count}</td>
    </tr>
  )
};
