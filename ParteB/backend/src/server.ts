import mysql from 'mysql2';
import express from "express"
import cors from "cors"

const client = mysql.createConnection({
    host: '192.168.78.28',
    user: 'laizastef',
    password: '11',
    database: 'ProjetoFinal',
});

client.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
});

const app = express()
app.use(cors())
app.use(express.json())


app.post('/inserirContato', async (req, res) => {

    const { nome, telefone } = req.body;

    const query = 'INSERT INTO listaTelefonica (nome, telefone) VALUES (?, ?)';
    client.query(query,[nome, telefone], (err, result) => {
      if(err){
          console.error('Erro ao inserir usuario:  '+ err);
          res.send({msg:'Contato inserido com sucesso.', Sucesso: false})
      }else{
          res.send({msg:'Contato inserido com sucesso.', Sucesso: true})
      }
    } )
});

app.get('/listarContatos', (req, res) => {
    const query = 'SELECT * FROM listaTelefonica;';

    client.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            res.send({ msg: 'Erro', Sucesso: false });
        } else {
            console.log('Usuários buscados com sucesso!');
            res.send({ Sucesso: true, usuarios: result });
        }
    });
});

app.delete('/excluirContato/:id', (req, res) => {
    const { id } = req.params; // Obtém o ID do usuário a ser excluído a partir dos parâmetros da URL

    const query = 'DELETE FROM listaTelefonica WHERE id = ?';

    client.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir contato:', err);
            res.send({ msg: 'Erro ao excluir contato', Sucesso: false });
        } else {
            console.log('contato excluído com sucesso!');
            res.send({ msg: 'contato excluído com sucesso', Sucesso: true });
        }
    });
});

app.put('/updateContato', (req, res) => {
    const { nome } = req.body
    const { telefone } = req.body
    const { id } = req.body

    const SQL = 'UPDATE listaTelefonica SET nome = ?, telefone = ? WHERE id = ?'
    const values = [nome, telefone, id]

    client.query(SQL, values, (err, result) => {
        if (err) {
            console.error('Erro ao editar contato:', err);
            res.send({ msg: 'Erro', Sucesso: false });
        } else {
            console.log('contato editado com sucesso!');
            res.send({msg: 'contato editado com sucesso!', Sucesso: true});
        }
    })
})


app.listen(3001, () => {
    console.log("Servidor rodando!")
})