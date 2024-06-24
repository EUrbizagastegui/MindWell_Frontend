import './RegisterEvaluation.css'
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import NavBarComponent from '../../component/navBarComponent/NavBarComponent'

const RegisterEvaluation = () => {
    const navigate = useNavigate();

    const navegarA = (destino) => {
        navigate(destino);
    };

    return (
        <div className='register-evaluation'>
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <div className="re-body">
                <Button size="large" label="Test de Ansiedad" onClick={() => navegarA('/test-ansiedad')} />
                <Button size="large" label="Test de Depresión" onClick={() => navegarA('/test-depresion')} />
            </div>
        </div>
    );
};

export default RegisterEvaluation