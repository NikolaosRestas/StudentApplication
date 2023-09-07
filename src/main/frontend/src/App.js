import './App.css';
import {Component} from "react";
import { Switch, Route } from 'react-router-dom';
import Navbar from "./navbar/Navbar";
import StudentsPage from "./students/students";


class App extends Component {

    render() {
        return (
            <div>
                <Navbar/>
                <Switch>
                    <Route path="/students" component={StudentsPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
