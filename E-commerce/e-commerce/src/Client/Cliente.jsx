import { useState } from 'react';
import NavBar from './NavBar';
import InformativoCarousel from "./InformativoCarousel";
import Loja from './Loja';
import Bottom from './Bottom';
import Carrinho from './Carrinho';
import Filtros from './Filtros';
function Cliente() {
  const [exibirCarrinho, setExibirCarrinho] = useState(false);
  const items = [
    {
      id: 1,
      imgSrc: "https://imgs.search.brave.com/SZnIjdHESPQmCl3Zuc8oy9KQGkaOiQHohHxf_4WrKA0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFEMFVG/RlBreWsvMS8wLzEw/MDN3L2NhbnZhLXZl/cmRlLWUtYnJhbmNv/LXNpbXBsZXMtZGkl/QzMlQTFyaW8tZGUt/b3JhJUMzJUE3JUMz/JUEzby1jYXBhLWRl/LWxpdnJvLUItbEFG/eUZUVWtFLmpwZw",
      title: "Graças e louvores.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eligendi quis, repudiandae aliquid dolorum quibusdam accusantium esse qui corporis magnam laudantium harum dignissimos velit consectetur nemo aspernatur, illum corrupti maiores?",
      price: "19,85",
    },
    {
      id: 2,
      imgSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_755009-MLU74094588170_012024-F.webp",
      title: "Percy jackson e o ladrão de raios.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eligendi quis, repudiandae aliquid dolorum quibusdam accusantium esse qui corporis magnam laudantium harum dignissimos velit consectetur nemo aspernatur, illum corrupti maiores?",
      price: "19,85",
    },
    
    {
      id: 3,
      imgSrc: "https://imgs.search.brave.com/5YQidcaSBP90j8SKzt-VWOZtiqNlPZu54NgzND4SR4U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxKzJSUnN0c2NM/LmpwZw",
      title: "Percy Jackson. O Cálice dos Deuses.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eligendi quis, repudiandae aliquid dolorum quibusdam accusantium esse qui corporis magnam laudantium harum dignissimos velit consectetur nemo aspernatur, illum corrupti maiores?",
      price: "19,85",
    },
    
    {
      id: 5,
      imgSrc: "https://marketplace.canva.com/EAEwYeP9WYQ/1/0/1003w/canva-capa-de-livro-de-receitas-em-amarelo-com-foto-_0jN_FamO1s.jpg",
      title: "Cozinha Incrível.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eligendi quis, repudiandae aliquid dolorum quibusdam accusantium esse qui corporis magnam laudantium harum dignissimos velit consectetur nemo aspernatur, illum corrupti maiores?",
      price: "19,85",
    },
    
    {
      id: 7,
      imgSrc: "https://marketplace.canva.com/EAEwYeP9WYQ/1/0/1003w/canva-capa-de-livro-de-receitas-em-amarelo-com-foto-_0jN_FamO1s.jpg",
      title: "Tratado do amor de Deus.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eligendi quis, repudiandae aliquid dolorum quibusdam accusantium esse qui corporis magnam laudantium harum dignissimos velit consectetur nemo aspernatur, illum corrupti maiores?",
      price: "19,85",
    },
    
    {
      id: 8,
      imgSrc: "https://img.freepik.com/fotos-gratis/vista-do-livro-biblico-dentro-da-igreja_23-2150582328.jpg?w=360&t=st=1721686537~exp=1721687137~hmac=441f6e42b36bed56ffbffb1be0af5e85685f5e8fed06028d8cdda41672973631",
      title: "Bíblia Sagrada.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eligendi quis, repudiandae aliquid dolorum quibusdam accusantium esse qui corporis magnam laudantium harum dignissimos velit consectetur nemo aspernatur, illum corrupti maiores?",
      price: "19,85",
    },
    
    {
      id: 9,
      imgSrc: "https://img.travessa.com.br/livro/BA/bb/bb80b552-7095-4601-bb0e-38cf8178a697.jpg",
      title: "As crônicas de Narnia, edição completa.",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eligendi quis, repudiandae aliquid dolorum quibusdam accusantium esse qui corporis magnam laudantium harum dignissimos velit consectetur nemo aspernatur, illum corrupti maiores?",
      price: "19,85",
    },
    {
      id: 10,
      imgSrc: "https://imagens.elivros.love/J-K-Rowling/Baixar-Livro-Harry-Potter-a-Colecao-Completa-de-Sete-Livros-J-Em-Epub-Pdf-Mobi-Ou-Ler-Online_large.jpg",
      title: "Harry Potter, edição completa",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eligendi quis, repudiandae aliquid dolorum quibusdam accusantium esse qui corporis magnam laudantium harum dignissimos velit consectetur nemo aspernatur, illum corrupti maiores?",
      price: "19,85",
    }
  ];
  return (
    <>
      <NavBar setExibirCarrinho={setExibirCarrinho} />
      <InformativoCarousel />
      <Filtros/>
      <Loja items={items} />
      {exibirCarrinho && <Carrinho exibir={exibirCarrinho} setExibir={setExibirCarrinho} />}
      <Bottom />
    </>
  );
}

export default Cliente;
