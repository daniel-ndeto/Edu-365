import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from @reduxjs/toolkit
import { userReducer } from './userRelated/userSlice'; // Import the userReducer
import { studentReducer } from './studentRelated/studentSlice'; // Import the studentReducer
import { noticeReducer } from './noticeRelated/noticeSlice'; // Import the noticeReducer
import { sclassReducer } from './sclassRelated/sclassSlice'; // Import the sclassReducer
import { teacherReducer } from './teacherRelated/teacherSlice'; // Import the teacherReducer
import { complainReducer } from './complainRelated/complainSlice'; // Import the complainReducer

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer
    },
});

export default store; // Export the configured store
