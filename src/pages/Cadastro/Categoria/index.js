import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageDefault from "../../../components/PageDefault";
import FormField from "../../../components/FormField";
import Button from "../../../components/Button";

function CadastroCategoria() {
  const valoresIniciais = {
    nome: "",
    descricao: "",
    cor: "",
  };
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  useEffect(() => {
    fetch("http://localhost:8080/categorias").then(async (resposta) => {
      const res = await resposta.json();
      setCategorias([...res]);
    });
  });

  function handleChange(e) {
    setValue(e.target.getAttribute("name"), e.target.value);
  }

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>
      <form
        onSubmit={function handleSubmit(e) {
          e.preventDefault();
          setCategorias([...categorias, values]);
          setValues(valoresIniciais);
        }}
      >
        <FormField
          label="Categoria:"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição:"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor:"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>Cadastrar</Button>
      </form>
      {categorias.length === 0 && <div>Loading...</div>}
      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.name}`}>{categoria.nome}</li>
        ))}
      </ul>
      <Link to="/">Ir para a Home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
