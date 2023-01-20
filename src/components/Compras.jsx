import { useReducer, useState, useRef } from "react";

const valoirInicial = [];

const types = {
  comprar: "comprar",
  menos: "menos",
  sumar: "sumar",
  borrar: "borrar",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.comprar:
      return [...state, action.payload];
    case types.menos:
      return state.map((dato) =>
        dato.id === action.payload && dato.cantidad > 1
          ? { ...dato, cantidad: dato.cantidad - 1 }
          : dato
      );
    case types.sumar:
      return state.map((dato) =>
        dato.id === action.payload
          ? { ...dato, cantidad: dato.cantidad + 1 }
          : dato
      );
    case types.borrar:
      return state.filter((dato) => dato.id !== action.payload);
    default:
      return state;
  }
};

const Compras = () => {
  const [lista, dispatch] = useReducer(reducer, valoirInicial);
  const [miProducto, setMiproducto] = useState("");
  const inputRef = useRef(null);
  return (
    <>
      <label htmlFor="productos">Productos</label>
      <input
        type="text"
        id="productos"
        value={miProducto}
        ref={inputRef}
        onChange={(e) => setMiproducto(e.target.value)}
      />
      <button
        onClick={() => {
          inputRef.current.focus();
          setMiproducto("");
          dispatch({
            type: types.comprar,
            payload: { id: Date.now(), nombre: miProducto, cantidad: 1 },
          });
        }}
      >
        Añadir
      </button>
      {lista.map((producto) => (
        <div key={producto.id}>
          {producto.nombre} ({producto.cantidad} unidades)
          <button
            onClick={() =>
              dispatch({ type: types.menos, payload: producto.id })
            }
          >
            -
          </button>
          <button
            onClick={() => dispatch({ type: types.sumar, payload: producto.id })}
          >
            +
          </button>
          <button
            onClick={() =>
              dispatch({ type: types.borrar, payload: producto.id })
            }
          >
            x
          </button>
        </div>
      ))}
    </>
  );
};

export default Compras;
