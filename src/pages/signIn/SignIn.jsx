import './SignIn.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navegar = useNavigate()

    return (
        <div className="sign-in">
            <div className='si-left'>
                <div className='sill'>
                    <h1>Bienvenido a MindWell!</h1>
                    <p>Inicie sesión y disfrute de los beneficios de nuestra aplicación en su vida diaria.</p>
                </div>
            </div>
            <div className="si-right">
                <div className='sir-body'>
                    <label htmlFor="email">Email</label>
                    <InputText id='email' placeholder='Email' />
                    <label htmlFor="password">Contraseña</label>
                    <InputText id='password' placeholder='Password' />
                    <Button label='Iniciar sesión' onClick={() => navegar('/home')}/>

                    <p>¿No tienes una cuenta? <a href='/sign-up'>Registrate</a></p>
                </div>
            </div>
        </div>
    )
}

export default SignIn