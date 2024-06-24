import './NavBarComponent.css'
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

const NavBarComponent = () => {
    const navegar = useNavigate()

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => navegar('/home')
        },
        {
            label: 'Evaluaciones',
            icon: 'pi pi-fw pi-file',
            command: () => navegar('/evaluaciones')
        },
        {
            label: 'Bitacora',
            icon: 'pi pi-fw pi-pencil',
            command: () => navegar('/personallog')
        },
        {
            label: 'Recursos',
            icon: 'pi pi-fw pi-file',
            command: () => navegar('/resources')
        },
        {
            label: 'Notificaciones',
            icon: 'pi pi-fw pi-bell',
            command: () => navegar('/notifications')
        },
        {
            label: 'Tratamientos',
            icon: 'pi pi-fw pi-file',
            command: () => navegar('/tratamientos')
        }
    ]

    return (
        <div className='nav'>
            <Menubar model={items}  />
        </div>
    )
}

export default NavBarComponent