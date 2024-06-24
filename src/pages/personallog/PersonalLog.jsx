import './PersonalLog.css'
import { Card } from 'primereact/card';

const PersonalLog = () => {
    return (
        <div className="main">
            <Card title="Bitacora 1"subTitle="Fecha 22/03/2024">
            <p className="m-0">
                Hoy resulto ser un buen día. Mejore mi puntualidad en la asistencia.
            </p>
            </Card>
            <Card title="Bitacora 2"subTitle="Fecha 17/02/2024">
            <p className="m-0">
                Hoy me levante con cansancio a pesar de que dormí 8 horas.
            </p>
            </Card>
        </div>
    )
}

export default PersonalLog