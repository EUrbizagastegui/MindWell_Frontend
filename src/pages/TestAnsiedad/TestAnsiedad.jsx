import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import NavBarComponent from '../../component/navBarComponent/NavBarComponent'
import APIGatewayService from '../../shared/services/api-gateway-service';
import { useNavigate } from 'react-router-dom';

const TestAnsiedad = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assessmentId, setAssessmentId] = useState(null);
    const [type, setType] = useState(2);
    const navigate = useNavigate();

    const fetchQuestions = async () => {
        try {
            const response = await APIGatewayService.getQuestionsbyTestId(2);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    const createAssessment = async () => {
        const currentDateTime = new Date().toISOString();
        const userId = JSON.parse(localStorage.getItem("user")).id;

        const data = {
            "date": currentDateTime,
            "user_Id": userId
        };
        try {
            const response = await APIGatewayService.createAssessment(data);
            setAssessmentId(response.data.id);
            console.log('Assessment created successfully', response);
            console.log("AssessmentId: ", assessmentId);
        } catch (error) {
            console.error('Error creating assessment:', error);
        }
    };

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    const calculateResults = async () => {
        try {
            const dataAnxiety = {
                "assessment_Id": assessmentId,
                "answers": answers
            };
            const response = await APIGatewayService.calculateAnxiety(dataAnxiety);
            // Enviar el diagnosis_Id al componente de recomendaciones
            const diagnosisId = response.data.diagnosis_Id;
            navigate('/recomendaciones', { state: { diagnosisId, assessmentId, type } });
        } catch (error) {
            console.error('Error calculating results:', error);
        }
    }

    const handleSubmit = async () => {
        calculateResults();
    };

    const renderOptions = (questionIndex) => {
        const options = [
                { label: 'No', value: 0 },
                { label: 'Leve', value: 1 },
                { label: 'Moderado', value: 2 },
                { label: 'Bastante', value: 3 }
            ];

            return options.map(option => (
                <div key={option.value} className="p-field-radiobutton">
                    <RadioButton
                    inputId={`${questionIndex}-${option.value}`}
                    name={`question-${questionIndex}`}
                    value={option.value}
                    onChange={(e) => handleAnswerChange(questionIndex, e.value)}
                    checked={answers[questionIndex] === option.value}
                />
                    <label htmlFor={`${questionIndex}-${option.value}`}>{option.label}</label>
                </div>
            ));
    };

    const renderTable = () => (
        <DataTable value={questions}>
            <Column field="text" header="Pregunta" body={(rowData, { rowIndex }) => (
                <div>
                    <h3>{rowData.text}</h3>
                </div>
            )} />
            <Column field="options" header="Opciones" body={(rowData, { rowIndex }) => renderOptions(rowIndex)} />
        </DataTable>
    );

    useEffect(() => {
        createAssessment();
    }, []);
    
    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className='anxiety-evaluation'>
            <div className='home-nav'>
                <NavBarComponent />
            </div>
            <div className="ae-body">
                <h1>Test de depresión</h1>
                {loading ? (
                    <p>Cargando preguntas...</p>
                ) : (
                    renderTable()
                )}
                <Button label="Enviar" icon="pi pi-check" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default TestAnsiedad;
