import './Recomendaciones.css'
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import NavBarComponent from '../../component/navBarComponent/NavBarComponent'
import APIGatewayService from '../../shared/services/api-gateway-service';
import { Card } from 'primereact/card';

const Recomendaciones = () => {
    const location = useLocation();
    const diagnosisId = location.state?.diagnosisId;
    const assessmentId = location.state?.assessmentId;
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [diagnostico, setDiagnostico] = useState('Cargando...');

    const fetchRecomendacionesByDiagnosisId = async (diagnosisId) => {
        try {
            const response = await APIGatewayService.getRecommendationsbyDiagnosisId(diagnosisId);
            setRecomendaciones(response.data);
            console.log("Recomendaciones de depresión: ", response.data);
        } catch (error) {
            console.error('Error getting recomendations:', error);
        }
    }

    const createAssessmentRecommendation = async (assessmentId, recommendationId) => {
        const data = {
            "assessment_Id": assessmentId,
            "recommendation_Id": recommendationId
        };
        try {
            console.log("Data: ", data);
            const response = await APIGatewayService.createAssesssmentRecommendation(data);
            console.log('Assessment Recommendation created successfully', response);
        } catch (error) {
            console.error('Error creating assessment recommendation:', error);
        }
    }

    const getDiagnostico = async (diagnosisId) => {
        try {
            const response = await APIGatewayService.getDiagnosisById(diagnosisId);
            const nombreDiagnostico = response.data.name;
            setDiagnostico(nombreDiagnostico);
        } catch (error) {
            console.error('Error getting diagnosis:', error);
            setDiagnostico('Desconocido');
        }
    };

    useEffect(() => {
        if (diagnosisId) {
            getDiagnostico(diagnosisId);
            fetchRecomendacionesByDiagnosisId(diagnosisId);
        }
    }, [diagnosisId]);

    const renderCards = () => {
        return recomendaciones.map((recomendacion) => (
            <Card
            className='re-card'
            key={recomendacion.id}
            title={recomendacion.category === 'DIN' || recomendacion.category === 'AIN' ? 'En casa' : 'En el exterior'}
            onClick={() => createAssessmentRecommendation(assessmentId, recomendacion.id)}>
                <h3>{recomendacion.description}</h3>
                <br />
                <p>Frecuencia: {recomendacion.frecuency}</p>
            </Card>
        ));
    };

    return (
        <div className='recomendaciones'>
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <h1>Recomendaciones</h1>
            <h3>Diagnóstico: {diagnostico}</h3>
            <div className='re-body'>
                {renderCards()}
            </div>
        </div>
    )
}

export default Recomendaciones