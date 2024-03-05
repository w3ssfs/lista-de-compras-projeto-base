let listaDeItens = [];

const form = document.getElementById("form-itens");
const itensInput = document.getElementById("receber-item");
const ulItens = document.getElementById("lista-de-itens");
const ulItensComprados = document.getElementById("itens-comprados");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  salvarItem();
  mostrarItem();
  itensInput.focus();
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
      checar: false,
    });
  }

  itensInput.value = "";
}

function mostrarItem() {
  ulItens.innerHTML = "";
  ulItensComprados.innerHTML = "";
  listaDeItens.forEach((e, index) => {
    if (e.checar) {
      ulItensComprados.innerHTML += `
  <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
  <div>
      <input type="checkbox" checked class="is-clickable" />  
      <span class="itens-comprados is-size-5">${e.valor}</span>
  </div>
  <div>
      <i class="fa-solid fa-trash is-clickable deletar"></i>
  </div>
  </li>
`;
    } else {
      ulItens.innerHTML += `
    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
    <div>
        <input type="checkbox" class="is-clickable" />
        <input type="text" class="is-size-5" value="${e.valor}"></input>
    </div>
    <div>
        <i class="fa-solid fa-trash is-clickable deletar"></i>
    </div>
</li>
    `;
    }
  });
  const inputCheck = document.querySelectorAll('input[type="checkbox"]');

  inputCheck.forEach((i) => {
    i.addEventListener("click", (e) => {
      const valorDoElemento =
        e.target.parentElement.parentElement.getAttribute("data-value");
      listaDeItens[valorDoElemento].checar = e.target.checked;
      mostrarItem();
    });
  });

  const deletarObj = document.querySelectorAll(".deletar");

  deletarObj.forEach((i) => {
    i.addEventListener("click", (e) => {
      const valorDoElemento =
        e.target.parentElement.parentElement.getAttribute("data-value");
      listaDeItens.splice(valorDoElemento, 1);
      mostrarItem();
    });
  });
}
