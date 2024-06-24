import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/signIn/SignIn';
import SignUp from '../pages/signup/SignUp';
import Resources from '../pages/resources/Resources';
import Home from '../pages/home/Home';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path='/resources' element={<Resources/>}/>
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/' element={<Navigate to='/sign-in' />} />
                <Route path="*" element={<Navigate to="/sign-in" />} />
            </Routes>
        </Router>
    )
}

export default AppRouter