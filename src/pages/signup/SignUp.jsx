import './SignUp.css'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const SignUp = () => {
    return (
        <div className="sign-up">
            <div className='su-body'>
                <div className="sub-title">
                    <h1>Crea tu cuenta</h1>
                </div>
                <p>¿Ya tienes una cuenta? <a href='/sign-in'>Inicia sesión</a></p>
                <label htmlFor="nombre">Nombre</label>
                <InputText id='nombre' placeholder='Nombre' />
                <label htmlFor="edad">Edad</label>
                <InputText id='edad' placeholder='Edad' />
                <label htmlFor="email">Email</label>
                <InputText id='email' placeholder='Email' />
                <label htmlFor="contraseña">Contraseña</label>
                <InputText id='contraseña' placeholder='Contraseña' />
                <label htmlFor="repetir-contraseña">Repetir contraseña</label>
                <InputText id='repetir-contraseña' placeholder='Repetir contraseña' />
                <Button label='Registrarse' />
            </div>
        </div>
    )
}

export default SignUp