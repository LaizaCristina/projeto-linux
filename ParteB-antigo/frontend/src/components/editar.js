import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Editar() {
  const { id } = useParams(); // Get the contact ID from the route
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [selectedContato, setSelectedContato] = useState(null);
  const [editarNome, setEditarNome] = useState('');
  const [editarTelefone, setEditarTelefone] = useState('');

  // // ...

  // const popular = (contato) => {
  //   // When the "Editar" button is clicked, set the selected contact and open the edit modal
  //   setSelectedContato(contato);
  //   setEditarNome(contato.nome);
  //   setEditarTelefone(contato.telefone);
  //   setEditarId(contato.id);
  // };

  // // ...

  // useEffect(() => {
  //   // Fetch the contact data using the ID
  //   async function fetchContactData() {
  //     const response = await Axios.get(`http://localhost:3001/getContatos/${id}`);
  //     if (response.data.Sucesso) {
  //       const { nome, telefone } = response.data.contato;
  //       setEditarNome(nome);
  //       setEditarTelefone(telefone);
  //     } else {
  //       Swal.fire('Erro', response.data.msg, 'error');
  //     }
  //   }

  //   fetchContactData();
  // }, [id]);

  // // ...

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        ml: 5,
        mt: 5,
      }}
      noValidate
      autoComplete="off"
    >
      <Typography>Editar contato da Lista Telefônica</Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Nome"
          onChange={(e) => setEditarNome(e.target.value)}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Telefone"
          onChange={(e) => setEditarTelefone(e.target.value)}
        />
      </div>
      <Button variant="outlined">
        Salvar Edições
      </Button>
    </Box>
  );
}
