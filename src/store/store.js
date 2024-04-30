import {configureStore} from "@reduxjs/toolkit";
import ssdReducer from './selected_session_date.js';
import modalReducer from './modal_show.js';
import expertReducer from './guest_experts.js';
import formSessionReducer from './form_data.js';
import fetchSessionListReducer from './fetchSessionList.js';
import fetchSessionItemReducer from './fetch_session.js';
import categoryReducer from './category.js';
import categoryListReducer from './category_thunk.js';
import memberListReducer from './member.js';
import formTaskReducer from './task_form_data.js';
import tasksListReducer from './task_thunk.js';
import taskFilterFormReducer from './period_filter_task.js';
import pageNumberTasksReducer from './page_number_tasks.js';
import subTasksListReducer from './subTask_thunk.js';
import deadLineReducer from './deadlin.js';
import theMemberTasksReducer from './tasks_subTasks_list.js';

export const store = configureStore({
    reducer: {
        selectedSession : ssdReducer,
        modalState : modalReducer,
        InvitedExperts : expertReducer,
        formSession : formSessionReducer,
        sessionList : fetchSessionListReducer,
        sessionItem : fetchSessionItemReducer,
        category : categoryReducer,
        categoryList : categoryListReducer,
        membersList : memberListReducer,
        formTask : formTaskReducer,
        tasksList : tasksListReducer,
        taskFilterForm : taskFilterFormReducer,
        pageNumberTasks : pageNumberTasksReducer,
        subTasksList : subTasksListReducer,
        deadLine : deadLineReducer,
        theMemberTasks : theMemberTasksReducer,
    }
})