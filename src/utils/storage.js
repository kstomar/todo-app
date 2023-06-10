const setData = (column) => {
  return localStorage.setItem("todos", JSON.stringify(column));
}

const getData = () => {
  return JSON.parse(localStorage.getItem("todos"))
}

export {
  setData,
  getData
}
