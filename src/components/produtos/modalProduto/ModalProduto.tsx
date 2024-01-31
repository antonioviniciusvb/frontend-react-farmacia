import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import './ModalProduto.css';
import FormularioProduto from '../formularioProduto/FormularioProduto';

function ModalProduto() {
  return (
    <>
      <Popup 
      trigger={<button className='border rounded px-4 hover:bg-white hover:text-green-800'>Nova produto</button>} modal>
        <div>
          <FormularioProduto />
        </div>
      </Popup>
    </>
  );
}

export default ModalProduto;