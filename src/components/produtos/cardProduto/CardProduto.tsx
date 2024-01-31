import { Link } from 'react-router-dom'
import Produto from '../../../models/Produto'

interface CardProdutoProps {
  post: Produto
}

function CardProduto({post}: CardProdutoProps) {
  return (
    <div className='border-slate-900 border flex flex-col rounded overflow-hidden justify-between'>
      <div>
        <div className="flex w-full bg-green-900 text-white py-2 px-4 items-center gap-4">
          <h3 className='text-lg font-bold text-center uppercase '>{post.nome}</h3>
        </div>
        <div className='p-4'>
    
          <img  src={post.foto} className='h-32 mx-auto' alt="" />
          <p className='p-4 text-lg font-bold text-center uppercase text-green-950'>{post.preco}</p>
          <p>Categoria: {post.categoria?.nome}</p>
          </div>
      </div>
      <div className="flex">
      <Link to={`/editarProduto/${post.id}`} className='w-full text-white bg-green-700 hover:bg-green-900 flex items-center justify-center py-2'>
          <button>Editar</button>
        </Link>
        <Link to={`/deletarProduto/${post.id}`} className='text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center'>
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardProduto