import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2' 
import Axios from 'axios'

export default function Inserir() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');


const insertUSer = async () => {
    const response = await Axios.post('http://localhost:3001/inserirContato', {
      nome: nome,
      telefone: telefone
    })

    if(response){
      if(response.data.Sucesso){
        Swal.fire('Sucesso', response.data.msg, 'success')
      }else{
        Swal.fire('Erro', response.data.msg, 'error')
      }
      
    }
}


  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' }, ml:5, mt: 5
      }}
      noValidate
      autoComplete="off"
    >
      <Typography>Inserir contato em Lista Telefônica</Typography>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <Button variant="outlined" onClick={insertUSer}>
        Inserir
      </Button>
    </Box>
  );
}