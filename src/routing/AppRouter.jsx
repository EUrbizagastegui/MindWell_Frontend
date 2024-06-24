import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/signIn/SignIn';
import SignUp from '../pages/signup/SignUp';
import Resources from '../pages/resources/Resources';
import Home from '../pages/home/Home';
import Personallog from '../pages/personallog/Personallog';
import Notifications from '../pages/notifications/Notifications';
import Evaluaciones from '../pages/evaluaciones/Evaluaciones';
import RegisterEvaluation from '../pages/register-evaluation/RegisterEvaluation';
import Recomendaciones from '../pages/recomendaciones/Recomendaciones';
import TestAnsiedad from '../pages/TestAnsiedad/TestAnsiedad';
import TestDepresion from '../pages/testDepresion/TestDepresion';
import Tratamientos from '../pages/tratamientos/Tratamientos';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path='/resources' element={<Resources/>}/>
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/personallog' element={<Personallog />} />
                <Route path='/notifications' element={<Notifications />} />
                <Route path='/evaluaciones' element={<Evaluaciones />} />
                <Route path='/register-evaluation' element={<RegisterEvaluation />} />
                <Route path='/test-ansiedad' element={<TestAnsiedad />} />
                <Route path='/test-depresion' element={<TestDepresion />} />
                <Route path='/recomendaciones' element={<Recomendaciones />} />
                <Route path='/tratamientos' element={<Tratamientos />} />
                <Route path='/' element={<Navigate to='/sign-in' />} />
                <Route path="*" element={<Navigate to="/sign-in" />} />
            </Routes>
        </Router>
    )
}

export default AppRouter