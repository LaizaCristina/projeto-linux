import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2' 
import Axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Modal } from '@mui/material';

export default function Tudo() {
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

  const [contatos, setContatos] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false); // Controla a visibilidade do modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedNome, setEditedNome] = useState('');
  const [editedTelefone, setEditedTelefone] = useState('');
  const [editedId, setEditedId] = useState('');
  const listar = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/listarContatos');
      if (response.data.Sucesso) {
        console.log(response.data.usuarios);
        return response.data.usuarios;
      } else {
        console.error('Erro ao buscar usuários:', response.data.msg);
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return [];
    }
  };

  const fetchContatos = async () => {
    const contatos = await listar();
    setContatos(contatos);
  };

  useEffect(() => {
    fetchContatos();
  }, []);

  const excluir = async (contato) => {
    try {
        const response = await Axios.delete(`http://localhost:3001/excluirContato/${contato.id}`);
        if (response.data.Sucesso) {
            console.log('Contato excluído com sucesso:', contato.id);
            setContatos((prevcontatos) => prevcontatos.filter((c) => c.id !== contato.id));
        } else {
            console.error('Erro ao excluir contato:', response.data.msg);
        }
    } catch (error) {
        console.error('Erro ao excluir contato:', error);
    }
};
const editar = (user) => {
  // Quando o botão "Editar" é clicado, defina o usuário selecionado e abra o modal de edição
  setSelectedUser(user);
  setEditedNome(user.nome);
  setEditedTelefone(user.telefone);
  setEditedId(user.id)
  setShowModal(true);
};

const salvarEdicao = async (event) => {
  event.preventDefault();

  const response = await Axios.put('http://localhost:3001/updateContato', {
      nome: editedNome,
      telefone: editedTelefone,
      id: editedId
  })

  if (response.data.Sucesso) {
      Swal.fire('Sucesso', response.data.msg, 'success')
  } else {
      Swal.fire('Erro', response.data.msg, 'error')
  }

  console.log('Salvar edições para o contato:', selectedUser.id);
  setShowModal(false); // Fecha o modal após a edição
};

const handleModalClose = () => {
  setShowModal(false);
};

  return (
    <div>
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
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Nome</TableCell>
            <TableCell align="right">Telefone</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contatos.map((contato, index) => (
            <TableRow
              key={index}
              style={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right">{contato.nome}</TableCell>
              <TableCell align="right">{contato.telefone}</TableCell>
              <TableCell  align="right">
                <Button onClick={() => editar(contato)}>Editar</Button><Button onClick={() => excluir(contato)}>Excluir</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal 
      open={showModal}
    >
      <div style={{backgroundColor: 'white'}}>
        <h2 id="modal-modal-title">Editar Contato</h2>
        <div id="modal-modal-description">
          <TextField
            label="Nome"
            type="text"
            value={editedNome}
            onChange={(e) => setEditedNome(e.target.value)}
          />
          <TextField
            label="Telefone"
            type="text"
            value={editedTelefone}
            onChange={(e) => setEditedTelefone(e.target.value)}
          />
          
          <Button variant="contained" onClick={salvarEdicao}>
            Salvar
          </Button>
          <Button variant="contained" onClick={handleModalClose}>
                Fechar
              </Button>
        </div>
      </div>
    </Modal>
    </TableContainer>
    </div>
  );
}