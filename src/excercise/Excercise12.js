import { useState } from 'react';
const items = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Pineapple"
];

function Excercise12() {

  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const [color, setColor] = useState("");
  const [search, setSearch] = useState("");
  const [dragItem, setDragItem] = useState(null);
  const [list2, setList2] = useState(items);
  const handleInput = (e) => {
    setInput(e.target.value);
  }
  const handleAdd = () => {
    if (input === "") return;
    setList([...list, input]);
    setInput("");
  }

  const handleDelete = (index) => {
    setList(list.filter((_, i) => i !== index));
  }

  const handleDragStart = (index) => {
    setDragItem(index);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (dropIndex) => {
    const newList = [...list2];
    const draggedItem = newList[dragItem];

    //xoa item dang keo
    newList.splice(dragItem, 1);

    //chen item
    newList.splice(dropIndex, 0, draggedItem);
    setList2(newList);
    setDragItem(null);
  }
  const filteredItems = items.filter((item) => item.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <header></header>
      <div>
        <h2>Ex 12.1</h2>
        <button onClick={() => setCount(count + 1)}
        >Increment</button>
        <p>Count: {count}</p>
      </div>
      <div>
        <h2>Ex 12.2 and 12.4</h2>
        <button onClick={handleAdd}>Add</button>
        <input
          type="text"
          value={input}
          onChange={handleInput}
        />
        <p>Input text:  {input}</p>
      </div>
      <div>
        <h2>12.3</h2>
        <button
          onClick={() => setShow(!show)}
        >
          {show ? "Hide" : "Show"}
        </button>
        <p>{show ? "Toogle me" : ""}</p>
      </div>
      <div>
        <h2></h2>
        <strong>Todo list </strong>
        <div>
          {list.map((item, index) => (
            <li key={index}>{item}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}

        </div>
      </div>
      <div>
        <h2>12.5</h2>
        <select value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="">Chose color</option>
          <option value="red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Yellow">Yellow</option>
        </select>

        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: color,
            marginTop: "20px"
          }}
        ></div>

        <div>
          <h2>12.6 Search filter</h2>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul>
            {filteredItems.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Drag and drop list</h2>

          {list2.map((item, index) => (
            <div
              key={item}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              style={{
                padding: "15px",
                margin: "5px",
                border: "1px solid black",
                cursor: "grab",
                backgroundColor: "#f5f5f5"
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Excercise12;