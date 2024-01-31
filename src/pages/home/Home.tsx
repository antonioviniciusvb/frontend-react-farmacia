
function Home() {
    return (
      <>
        <div id="container" className="flex justify-center bg-green-700">
          <div id="subcontainer" className="container grid grid-cols-2 text-white">
            <div id="texto" className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className="text-5xl font-bold">Seja Bem Vinde!</h2>
              <p className="text-xl">Aqui você encontra os remedios!</p>
  
              <div className="flex justify-around gap-4">
                <div className="rounded text-white border-white border-solid border-2 px-4 py-2">
                  Novo Produto
                  </div>
              </div>
            </div>
            <div id="imagem" className="flex justify-center">
              <img
                src="https://ik.imagekit.io/mgz6clat5/Doctor-pana%20(1).svg?updatedAt=1706704263994"
                alt="Imagem da Página Home"
                className="w-2/3"></img>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default Home
  