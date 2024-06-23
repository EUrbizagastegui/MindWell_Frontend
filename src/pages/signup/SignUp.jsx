import './SignUp.css'
import APIGatewayService from '../../shared/services/api-gateway-service';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const SignUp = () => {
    const toast = useRef(null);
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('')
    const [edad, setEdad] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const showToast = (severity, summary, detail) => {
        toast.current.show({severity: severity, summary: summary, detail: detail});
    }

    const register = async () => {
        if (nombre === '' || edad === 0 || email === '' || password === '' || repetirPassword === '') {
            showToast('error', 'Error', 'Por favor, complete todos los campos.')
            return;
        } else if (password !== repetirPassword) {
            showToast('error', 'Error', 'Las contraseñas no coinciden.')
            return;
        }

        const data = {
            "name": nombre,
            "age": edad,
            "email": email,
            "password": password
        }

        try {
            const response = await APIGatewayService.createPatient(data)
            showToast('success', 'Cuenta creada', 'Ahora inicia sesión.')
            navigate('/sign-in')
        } catch (error) {
            showToast('error', 'Error', 'Ocurrió un error al crear el paciente. Por favor, intenta nuevamente.')
            console.log(error)
        }
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            register()
        }
    }

    return (
        <div className="sign-up">
            <Toast ref={toast} />
            <div className='su-body'>
                <div className="sub-title">
                    <h1>Crea tu cuenta</h1>
                </div>
                <p>¿Ya tienes una cuenta? <a href='/sign-in'>Inicia sesión</a></p>
                <label htmlFor="nombre">Nombre</label>
                <InputText
                id='nombre'
                placeholder='Nombre'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                />
                <label htmlFor="edad">Edad</label>
                <InputText
                id='edad'
                placeholder='Edad'
                keyfilter="pnum"
                value={edad}
                onChange={e => setEdad(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <InputText
                id='email'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="contraseña">Contraseña</label>
                <InputText
                id='contraseña'
                placeholder='Contraseña'
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="repetir-contraseña">Repetir contraseña</label>
                <InputText
                id='repetir-contraseña'
                placeholder='Repetir contraseña'
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
                />
                <Button
                label='Registrarse'
                onClick={register}
                onKeyDown={handleEnter}
                />
            </div>
        </div>
    )
}

export default SignUp