import { ChangeEvent, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import Categoria from '../../../models/Categoria';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';


function FormularioCategoria() {

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    let navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        await buscar(`/categorias/${id}`, setCategoria);
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })

        console.log(JSON.stringify(categoria))
    }

    async function gerarNovoCategoria(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        console.log(JSON.stringify(categoria))
        if (id !== undefined) {
            try {
                await atualizar(`/categorias`, categoria, setCategoria)

                ToastAlerta('Categoria atualizada com sucesso', 'sucesso')
            
            } catch (error: any) {
              
                ToastAlerta('Erro ao atualizar a Categoria', 'erro')
            }

        } else {
            try {
                await cadastrar(`/categorias`, categoria, setCategoria)

                ToastAlerta('Categoria cadastrada com sucesso', 'sucesso')

            } catch (error: any) {
   
                ToastAlerta('Erro ao cadastrar a Categoria', 'erro')
                
            }
        }

        setIsLoading(false)

        retornar()
    }

    function retornar() {
        navigate("/categorias")
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastre um novo Categoria' : 'Editar Categoria'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoCategoria}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Tipo da Categoria</label>
                    <input
                        type="text"
                        placeholder="Nome"
                        name='nome'
                        className="border-2 border-slate-700 rounded p-2"
                        value={categoria.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}

                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-green-700 hover:bg-green-900 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit"
                >

                    {isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true} /> : <span> {id === undefined ? 'Cadastrar' : 'Atualizar'}</span>}

                </button>
            </form>
        </div>
    );
}

export default FormularioCategoria;