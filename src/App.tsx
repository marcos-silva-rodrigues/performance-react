import { useState, useMemo, useCallback } from "react";
import { Item } from "./components/Item";

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [wishList, setWishList] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  function addItemToList() {
    setItems([...items, `Item: ${items.length}`]);
    setNewItem("");
  }

  /**
   * Evitar fica recriando a referencia da função de acordo com o
   * array de dependencias
   */
  const addItemToWishList = useCallback((item: string) => {
    setWishList((state) => [...state, item]);
  }, []);

  // function addItemToWishList(item: string) {
  //   setWishList(state => [...state, item]);
  // }

  /**
   * Executa apenas se os valores do array de dependencia mudar
   */
  const countItemWithOne = useMemo(() => {
    console.log("render function");
    const count = items.filter((item) => item.includes("1")).length;
    return { count };
  }, [items]);

  // const countItemWithOne = {
  //   count: items.filter((item) => item.includes("1")).length,
  // }

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setNewItem(e.target.value)}
        value={newItem}
      />
      <button onClick={addItemToList}>add</button>
      <ul>
        {items.map((item) => {
          return (
            <Item
              key={item}
              title={item}
              addItemToWishList={addItemToWishList}
              countItemWithOne={countItemWithOne}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
