import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscar } from '../../../services/Service';
import { DNA } from 'react-loader-spinner';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import Produto from '../../../models/Produto';
import CardProduto from '../cardProduto/CardProduto';


function ListaProdutos() {

  const [produtos, setProdutos] = useState<Produto[]>([]);

  let navigate = useNavigate();

  async function buscarProdutos() {
    try {
      await buscar('/produtos', setProdutos);
    } catch (error: any) {
      
        ToastAlerta('Erro, tente novamente', 'erro')
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, [produtos.length]);

  return (
    <>
      {produtos.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {produtos.map((produto) => (
          <CardProduto key={produto.id} post={produto} />
        ))}
      </div>
    </>
  );
}

export default ListaProdutos;