export const calculateSubjectAttendancePercentage = (presentCount, totalSessions) => {
    // Check if totalSessions is zero to avoid division by zero
    if (totalSessions === 0 || presentCount === 0) {
        return 0;
    }
    // Calculate the percentage
    const percentage = (presentCount / totalSessions) * 100;
    return percentage.toFixed(2); // Limit to two decimal places and return
};


// Group attendance data by subject
export const groupAttendanceBySubject = (subjectAttendance) => {
    const attendanceBySubject = {};

    subjectAttendance.forEach((attendance) => {
        const subName = attendance.subName.subName;
        const sessions = attendance.subName.sessions;
        const subId = attendance.subName._id;

        // Initialize subject data if not already present
        if (!attendanceBySubject[subName]) {
            attendanceBySubject[subName] = {
                present: 0,
                absent: 0,
                sessions: sessions,
                allData: [],
                subId: subId
            };
        }
        // Increment present or absent count based on status
        if (attendance.status === "Present") {
            attendanceBySubject[subName].present++;
        } else if (attendance.status === "Absent") {
            attendanceBySubject[subName].absent++;
        }
        // Store all attendance data for each subject
        attendanceBySubject[subName].allData.push({
            date: attendance.date,
            status: attendance.status,
        });
    });

    // Return the grouped attendance data
    return attendanceBySubject;
}

// Calculate overall attendance percentage across all subjects
export const calculateOverallAttendancePercentage = (subjectAttendance) => {
    let totalSessionsSum = 0;
    let presentCountSum = 0;
    const uniqueSubIds = [];

    subjectAttendance.forEach((attendance) => {
        const subId = attendance.subName._id;
        // Check if the subject has already been counted
        if (!uniqueSubIds.includes(subId)) {
            const sessions = parseInt(attendance.subName.sessions);
            // Add the total sessions for this subject
            totalSessionsSum += sessions;
            uniqueSubIds.push(subId);
        }
        // Increment present count if the status is "Present"
        presentCountSum += attendance.status === "Present" ? 1 : 0;
    });

    // Check if totalSessionsSum is zero to avoid division by zero
    if (totalSessionsSum === 0 || presentCountSum === 0) {
        return 0;
    }
    return (presentCountSum / totalSessionsSum) * 100;
};
