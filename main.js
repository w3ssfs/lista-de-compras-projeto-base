let listaDeItens = [];

const form = document.getElementById("form-itens");
const itensInput = document.getElementById("receber-item");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  salvarItem();
});

function salvarItem() {
  const comprasItem = itensInput.value;
  const checarDuplicado = listaDeItens.some(
    (element) => element.valor.toUpperCase() === comprasItem.toUpperCase()
  );
  if (checarDuplicado) {
    alert("Duplicado");
  } else {
    listaDeItens.push({
      valor: comprasItem,
    });
  }

  console.log(listaDeItens);
}
