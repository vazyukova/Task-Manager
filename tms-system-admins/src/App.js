import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectsList from './Pages/Projects.component';
import Users from './Pages/Users';
import TaskTypeTab from './Pages/TaskTypeTab'
import WorkflowTab from './Pages/WorkflowTab'
import AddNewWorkflow from './Pages/AddNewWorkflow'
import Support from './Pages/support'
import Dashboard from'./Pages/user-ui/dashboard'
import Plans from './Pages/user-ui/plans'
import Projects from "./Pages/user-ui/user-projects"
import UserSingleProject from "./Pages/user-ui/user-single-project";
import Task from "./Pages/user-ui/task"

import 'bootstrap/dist/css/bootstrap.min.css'
import './css/style.css';
import Auth from "./Pages/auth"
import ClosedAccess from "./Pages/closedAccess";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth/>}/>
          <Route path="/closedaccess" element={<ClosedAccess/>}/>
          <Route path="/projects" element={<ProjectsList/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/tasktypeschemes" element={<TaskTypeTab/>}/>
          <Route path="/workflowschemes" element={<WorkflowTab/>}/>
          <Route path="/addnewworkflow" element={<AddNewWorkflow/>}/>
          <Route path="/support" element={<Support/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/plans" element={<Plans/>}/>
          <Route path="/user/projects" element={<Projects/>}/>
          <Route path="/user/project/:id" element={<UserSingleProject/>}/>
          <Route path="/user/task/:id" element={<Task/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
