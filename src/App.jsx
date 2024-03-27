import React from 'react'
import "./App.css";
import {Footer, Header} from "./Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {About, Guide, Homepage, NotFoundPage} from "./pages";
import {
    AddMember, EditMember,
    EditSession, EditTask,
    Feedback,
    GanttChart, MemberAccess, MemberInformation, SessionsCategory,
    SessionsDefinition,
    SessionsList, SubTasks,
    TaskDefinition, TaskInfo, TasksList,
    Warnings
} from "./components";
import {Provider} from "react-redux";
import {Main} from "./Layout";
import {store} from "./store/store.js";

function App() {

    return (
        <>
            <Provider store={store}>
                <BrowserRouter>

                    <Header/>

                    <Routes>
                        <Route path={'/'} element={<Homepage />}>
                            <Route index element={<Main />} />
                            <Route path={'/sessions-category'} element={<SessionsCategory />} />
                            <Route path={'/sessions-definition'} element={<SessionsDefinition />} />
                            <Route path={'/sessions-list'} element={<SessionsList />} />
                            <Route path={'/edit-session/:sessionId'} element={<EditSession />} />
                            <Route path={'/feedback'} element={<Feedback />} />
                            <Route path={'/warnings'} element={<Warnings />} />
                            <Route path={'/tasks-list'} element={<TasksList />} />
                            <Route path={'/task-definition'} element={<TaskDefinition />} />
                            <Route path={'/task-info/:taskId'} element={<TaskInfo />} />
                            <Route path={'/subtask/:taskId'} element={<SubTasks />} />
                            <Route path={'/edit-task/:taskId'} element={<EditTask />} />
                            <Route path={'/gantt-chart'} element={<GanttChart />} />

                            <Route path={'/member-information'} element={<MemberInformation />} />
                            <Route path={'/add-member'} element={<AddMember />} />
                            <Route path={'/edit-member/:memberId'} element={<EditMember />} />
                            <Route path={'/member-access'} element={<MemberAccess />} />
                        </Route>
                        <Route path={'/guide'} element={<Guide />} />
                        <Route path={'/about'} element={<About />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>

                    <Footer/>

                </BrowserRouter>
            </Provider>
        </>
    )
}

export default App
