import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import Produto from "../../../models/Produto";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Categoria from "../../../models/Categoria";

function FormularioProduto() {

    let navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        nome: '',
    });

    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nome: '',
        preco: 0,
        foto: '',
        categoria: null,
    });

    async function buscarProdutoPorId(id: string) {
        await buscar(`/produtos/${id}`, setProduto);
    }

    async function buscarCategoriaPorId(id: string) {
        await buscar(`/categorias/${id}`, setCategoria);
    }

    async function buscarCategorias() {
        await buscar('/categorias', setCategorias);
    }

    useEffect(() => {
        buscarCategorias();
        if (id !== undefined) {
            buscarProdutoPorId(id);
            console.log(categoria);

        }
    }, [id]);

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
        });
    }, [categoria]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria
        });
    }

    function retornar() {
        navigate('/produtos');
    }

    async function gerarNovaProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true)

        console.log({ produto });

        if (id != undefined) {
            try {
                await atualizar(`/produtos`, produto, setProduto);
                ToastAlerta('Produto atualizada com sucesso', 'sucesso');

            } catch (error: any) {
                ToastAlerta('Erro ao atualizar a Produto', 'erro');
            }

        } else {
            try {

                await cadastrar(`/produtos`, produto, setProduto);
                ToastAlerta('Produto cadastrada com sucesso', 'sucesso');

            } catch (error: any) {

                ToastAlerta('Erro ao cadastrar a Produto', 'erro');
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoCategoria = categoria.nome === '';


    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}</h1>

            <form onSubmit={gerarNovaProduto} className="flex flex-col w-1/2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Titulo da produto</label>
                    <input
                        value={produto.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Texto da produto</label>
                    <input
                        value={produto.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Categoria da produto</p>
                    <select name="categoria" id="categoria" className='border p-2 border-slate-800 rounded' onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)} >
                        <option value="" selected disabled>Selecione um categoria</option>
                        {categorias.map((categoria) => (
                            <>
                                <option value={categoria.id} >{categoria.nome}</option>
                            </>
                        ))}

                    </select>
                </div>
                <button disabled={carregandoCategoria} type='submit' className='rounded disabled:bg-slate-200 bg-green-700 hover:bg-green-800 text-white font-bold w-1/2 mx-auto flex py-2 justify-center'>

                    {isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true} /> : <span> {id === undefined ? 'Cadastrar' : 'Editar'}</span>}

                </button>
            </form>
        </div>
    );
}

export default FormularioProduto;