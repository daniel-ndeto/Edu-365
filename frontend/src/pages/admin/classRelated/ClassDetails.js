/* eslint-disable no-unused-vars */ // Disable eslint warnings for unused variables

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
 
import { Button } from '@mui/material';
import {
    Box, Container, Typography, Tab,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import { BlueButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from '@mui/icons-material/PostAdd';
// eslint-disable-next-line no-unused-vars
import { alignProperty } from "@mui/material/styles/cssUtils";
// eslint-disable-next-line no-unused-vars
import { CenterFocusStrong } from "@mui/icons-material";
const CustomButton = ({ onClick, children }) => {
    const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',            // Use flexbox
        alignItems: 'center',       // Center items vertically
        justifyContent: 'center',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: '#ffea00', // Yellow shade
        },
    };

    return (
        <Button
            variant="contained"
            style={buttonStyle}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
const ClassDetails = () => {
    // Initialize necessary hooks and state variables
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id

    useEffect(() => {
        // Fetch class details, subject list, and class students on component mount
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"))
        dispatch(getClassStudents(classID));
    }, [dispatch, classID])

    if (error) {
        // Log any errors that occur during data fetching
        console.log(error)
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        // Handle deletion of subjects or students
        console.log(deleteID);
        console.log(address);

        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getClassStudents(classID));
                dispatch(resetSubjects())
                dispatch(getSubjectList(classID, "ClassSubjects"))
            })
    }

    const subjectColumns = [
        // Define columns for the subjects table
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ]

    const subjectRows = subjectsList && subjectsList.length > 0 && subjectsList.map((subject) => {
        return {
            // Map subject data to table rows
            name: subject.subName,
            code: subject.subCode,
            id: subject._id,
        };
    })

    const SubjectsButtonHaver = ({ row }) => {
        // Define buttons for each row in the subjects table
        return (
            <>
                <CustomButton onClick={() => deleteHandler(row.id, "Subject")}>
                    <DeleteIcon color="error" />
                </CustomButton>
                <BlueButton
                    variant="contained"
                    onClick={() => {
                        navigate(`/Admin/class/subject/${classID}/${row.id}`)
                    }}
                >
                    View
                </BlueButton >
            </>
        );
    };

    const subjectActions = [
        // Define actions for the subjects section speed dial
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/addsubject/" + classID)
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(classID, "SubjectsClass")
        }
    ];

    const ClassSubjectsSection = () => {
        // Render the class subjects section
        return (
            <>
                {response ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px',paddinTop:'15px' }}>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                        >
                            Add Subjects
                        </Button>
                    </Box>
                    :
                    <>
                        <Typography variant="h5" gutterBottom>
                            Subjects List:
                        </Typography>

                        <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                        <SpeedDialTemplate actions={subjectActions} />
                    </>
                }
            </>
        )
    }

    const studentColumns = [
        // Define columns for the students table
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            // Map student data to table rows
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        // Define buttons for each row in the students table
        return (
            <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CustomButton onClick={() => deleteHandler(row.id, "Student")}>
                        <PersonRemoveIcon color="error" />
                    </CustomButton>
                    <BlueButton
                        variant="contained"
                        onClick={() => navigate("/Admin/students/student/" + row.id)}
                    >
                        View
                    </BlueButton>
                    <PurpleButton
                        variant="contained"
                        onClick={() => navigate("/Admin/students/student/attendance/" + row.id)}
                    >
                        Attendance
                    </PurpleButton>
                </div>

            </>
        );
    };

    const studentActions = [
        // Define actions for the students section speed dial
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/class/addstudents/" + classID)
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    const ClassStudentsSection = () => {
        // Render the class students section
        return (
            <>
                {getresponse ? (
                    <>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                            >
                                Add Students
                            </Button>
                        </Box>

                    </>
                ) : (
                    <>

                        <Box
                            sx={{
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Apply box shadow
                                padding: '20px', // Add some padding for spacing
                                borderRadius: '10px', // Optional: Add border radius for rounded corners
                                backgroundColor: '#ffffff',
                                width: '100%' // Set background color to white
                            }}
                        >
                            <Typography variant="h5" gutterBottom>
                                <span style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', textAlign: 'center' }}>Student Lists:</span>
                            </Typography>
                            <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                            <SpeedDialTemplate actions={studentActions} />
                        </Box>

                    </>
                )}
            </>
        )
    }

    const ClassTeachersSection = () => {
        // Render the class teachers section
        return (
            <>
                <Box
                    sx={{
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Apply box shadow
                        padding: '20px', // Add some padding for spacing
                        borderRadius: '10px', // Optional: Add border radius for rounded corners
                        backgroundColor: '#ffffff',
                        width: '100%' // Set background color to white
                    }}
                ><span style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', textAlign: 'center' }}>Teachers:</span></Box>
            </>
        )
    }

    const ClassDetailsSection = () => {
        // Render the class details section
        const numberOfSubjects = subjectsList.length;
        const numberOfStudents = sclassStudents.length;

        return (
            <>
                <box sx={{ width: '100%', typography: 'body1', }}>
                    <Box sx={{
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Apply box shadow
                        padding: '20px', // Add some padding for spacing
                        borderRadius: '10px',
                        backgroundcolor: '#ffffff',// Optional: Add border radius for rounded corners
                    }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            <span style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', }}>Class Details</span> {/* Change font family, weight, and style */}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Welcome to the Class {sclassDetails && sclassDetails.sclassName}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Number of Subjects: {numberOfSubjects}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Number of Students: {numberOfStudents}
                        </Typography>
                    </Box>
                    {getresponse && response && (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button
                                // Button to navigate to add students page
                                variant="contained"
                                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                            >
                                Add Students
                            </Button>
                            <Button
                                // Button to navigate to add subjects page
                                variant="contained"
                                onClick={() => navigate("/Admin/addsubject/" + classID)}
                            >
                                Add Subjects
                            </Button>
                        </div>)}
                </box>
            </>


        );
    }

    return (
        // Render the main component structure
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Box sx={{ width: '100%', typography: 'body1', }} >
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}> {/* Tab list for navigation */}
                                    <Tab label="Details" value="1" /> {/* Tab for class details */}
                                    {/* <Tab label="Subjects" value="2" /> */}
                                    <Tab label="Students" value="3" />
                                    <Tab label="Teachers" value="4" />
                                </TabList>
                            </Box>
                            <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                                <TabPanel value="1">
                                    <ClassDetailsSection />
                                </TabPanel>
                                <TabPanel value="2">
                                    <ClassSubjectsSection />
                                </TabPanel>
                                <TabPanel value="3">
                                    <ClassStudentsSection />
                                </TabPanel>
                                <TabPanel value="4">
                                    <ClassTeachersSection />
                                </TabPanel>
                            </Container>
                        </TabContext>
                    </Box>
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;
