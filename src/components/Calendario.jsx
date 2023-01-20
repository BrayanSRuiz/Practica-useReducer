import React, { useReducer } from "react";
const currenTime = new Date();
const month = currenTime.getMonth();
const year = currenTime.getFullYear();
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const valorInicial = { m: month, a: year };

const reducer = (state, action) => {
  let newMonth = state.m;
  let newYear = state.a;
  switch (action.type) {
    case "masM":
      newMonth = newMonth == 11 ? 0 : newMonth + 1;
      break;
    case "menosM":
      newMonth = newMonth == 0 ? 11 : newMonth - 1;
      break;
    
    case "masA" :
      newYear = newYear +1
      break
    
    case "menosA" : 
      newYear = newYear-1
      break
  }
  return { m: newMonth, a:newYear };
};

const Calendario = () => {
  const [fecha, dispatch] = useReducer(reducer, valorInicial);
  return (
    <div>
      {meses[fecha.m]} ({fecha.a})
      <div>
        Meses : <button onClick={() => dispatch({ type: "masM" })}>+</button>
        <button onClick={() => dispatch({ type: "menosM" })}>-</button>
      </div>
      <div>
        Año : <button onClick={() => dispatch({ type: "masA" })}>+</button>
        <button onClick={() => dispatch({ type: "menosA" })}>-</button>
      </div>
    </div>
  );
};

export default Calendario;
