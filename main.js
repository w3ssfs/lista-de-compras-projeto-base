let listaDeItens = [];
let itemAEditar;

const form = document.getElementById("form-itens");
const itensInput = document.getElementById("receber-item");
const ulItens = document.getElementById("lista-de-itens");
const ulItensComprados = document.getElementById("itens-comprados");
const listaRecuperada = localStorage.getItem("listaDeItens");

function updateLocal() {
  localStorage.setItem("listaDeItens", JSON.stringify(listaDeItens));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  salvarItem();
  mostrarItem();
  itensInput.focus();
});

if (listaRecuperada) {
  listaDeItens = JSON.parse(listaRecuperada);
  mostrarItem();
} else {
  listaDeItens = [];
}

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
        <input type="text" class="is-size-5" value="${e.valor}" ${
        index != itemAEditar ? "disabled" : ""
      }></input>
    </div>
    <div>
        <i class="fa-solid fa-trash is-clickable deletar"></i>
        ${
          index == itemAEditar
            ? '<button onclick="salvarEdicao()"> <i class="fa-regular fa-floppy-disk is-clickable"></button>'
            : '</i><i class="fa-regular is-clickable fa-pen-to-square editar"></i>'
        }
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

  const editarItens = document.querySelectorAll(".editar");
  editarItens.forEach((i) => {
    i.addEventListener("click", (e) => {
      itemAEditar =
        e.target.parentElement.parentElement.getAttribute("data-value");
      console.log(itemAEditar);

      mostrarItem();
    });
  });

  updateLocal();
}

function salvarEdicao() {
  const itemEditado = document.querySelector(
    `[data-value="${itemAEditar}"] input[type="text"] `
  );
  // console.log(itemEditado.value);
  listaDeItens[itemAEditar].valor = itemEditado.value;
  itemAEditar = -1;
  mostrarItem();
}
