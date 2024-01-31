import { useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import Categoria from '../../../models/Categoria'
import { buscar, deletar } from '../../../services/Service'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function DeletarCategoria() {

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

    const [isLoading, setIsLoading] = useState<boolean>(false);

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria)
        } catch (error: any) {

            ToastAlerta('Erro ao buscar Categoria', 'erro')
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/categorias")
    }

    async function deletarCategoria() {

        setIsLoading(true)

        try {
            await deletar(`/categorias/${id}`)

            ToastAlerta('Categoria apagada com sucesso', 'sucesso')

        } catch (error) {
            ToastAlerta('Erro ao apagar o Categoria', 'erro')
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Categoria</h1>

            <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar a Categoria a seguir?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-green-700 text-white font-bold text-2xl'>Categoria</header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{categoria.nome}</p>
                <div className="flex">
                    <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>Não</button>
                    <button className='w-full text-slate-100 bg-green-700 hover:bg-green-900 flex items-center justify-center' onClick={deletarCategoria}>
                    {isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true} /> : <span>Sim</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarCategoria