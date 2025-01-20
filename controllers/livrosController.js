let livros = [
    { id: 1, titulo: "1984", autor: "George Orwell", ano: 1949 },
    { id: 2, titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899 }
  ];
  
  exports.criarLivro = (req, res) => {
    const { titulo, autor, ano } = req.body;
  
    if (!titulo || !autor || !ano) {
      return res.status(400).json({ erro: "Campos 'titulo', 'autor' e 'ano' são obrigatórios." });
    }
  
    const novoLivro = {
      id: livros.length + 1,
      titulo,
      autor,
      ano
    };
  
    livros.push(novoLivro);
    return res.status(201).json(novoLivro);
  };
  
  exports.buscarTodosLivros = (req, res) => {
    res.json(livros);
  };
  
  exports.buscarLivroPorId = (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id));
  
    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }
  
    res.json(livro);
  };
  
  exports.atualizarLivro = (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id));
  
    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }
  
    const { titulo, autor, ano } = req.body;
    if (titulo) livro.titulo = titulo;
    if (autor) livro.autor = autor;
    if (ano) livro.ano = ano;
  
    res.json(livro);
  };
  
  exports.excluirLivro = (req, res) => {
    const livroIndex = livros.findIndex(l => l.id === parseInt(req.params.id));
  
    if (livroIndex === -1) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }
  
    livros.splice(livroIndex, 1);
    res.status(204).send();
  };