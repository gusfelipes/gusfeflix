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
    const URL_TOP = window.location.hostname.includes("localhost")
      ? "http://localhost:8080/categorias"
      : "https://gusfeflix.herokuapp.com/categorias";
    fetch(URL_TOP).then(async (resposta) => {
      if (resposta.ok) {
        const res = await resposta.json();
        setCategorias(res);
        return;
      }
      throw new Error("Não foi possível conectar ao server");
    });
  }, []);

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
