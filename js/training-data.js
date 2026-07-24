(function () {
    const classroomAddress = 'SAAA Training Centre, CT Hub, 2 Kallang Avenue, Singapore 339407';

    function buildSessions(startDate, dayCount, startTime, endTime) {
        const sessions = [];
        const cursor = new Date(startDate + 'T00:00:00');
        let added = 0;

        while (added < dayCount) {
            const dayOfWeek = cursor.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                const year = cursor.getFullYear();
                const month = String(cursor.getMonth() + 1).padStart(2, '0');
                const day = String(cursor.getDate()).padStart(2, '0');
                sessions.push({
                    date: year + '-' + month + '-' + day,
                    startTime: startTime,
                    endTime: endTime
                });
                added++;
            }
            cursor.setDate(cursor.getDate() + 1);
        }

        return sessions;
    }

    const rawCourses = [
        { id: 'dg-7-1-initial', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Initial as per the IATA Dangerous Goods Training Guidance 7.1 (Supervised assessment)', functionName: 'Preparing Dangerous Goods Consignment', dayCount: 5, deliveryMode: 'classroom', scheduleStartDate: '2026-08-24', scheduleStartTime: '09:00', scheduleEndTime: '17:00', vacanciesLeft: 8 },
        { id: 'dg-7-2-initial', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Initial as per the IATA Dangerous Goods Training Guidance 7.2 (Supervised assessment)', functionName: 'Processing or Accepting Goods Presented as General Cargo', dayCount: 1, deliveryMode: 'virtual', scheduleStartDate: '2026-08-26', scheduleStartTime: '09:00', scheduleEndTime: '17:00', vacanciesLeft: 5 },
        { id: 'dg-7-3-initial', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Initial as per the IATA Dangerous Goods Training Guidance 7.3 (Supervised Assessment)', functionName: 'Processing or Accepting Dangerous Goods Consignments', dayCount: 4, deliveryMode: 'classroom', scheduleStartDate: '2026-08-28', scheduleStartTime: '09:00', scheduleEndTime: '17:00', vacanciesLeft: 11 },
        { id: 'dg-7-4-initial', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Initial as per IATA DGR function 7.4 (Supervised Assessment)', functionName: 'Handling Cargo in a Warehouse, Loading and Unloading Unit Load Devices and Loading and Unloading Aircraft Cargo Compartments', dayCount: 1, deliveryMode: 'classroom', scheduleStartDate: '2026-08-31', scheduleStartTime: '09:00', scheduleEndTime: '17:00', vacanciesLeft: 6 },
        { id: 'dg-7-5-initial', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Initial as per IATA DGR function 7.5 (Supervised Assessment)', functionName: 'Security Screening and Control of Dangerous Goods', dayCount: 2, deliveryMode: 'virtual', scheduleStartDate: '2026-09-02', scheduleStartTime: '09:00', scheduleEndTime: '13:00', vacanciesLeft: 4 },
        { id: 'dg-7-6-initial', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Initial as per IATA DGR function 7.6 (Supervised Assessment)', functionName: 'Loading, Segregation and Inspection of Dangerous Goods on Aircraft', dayCount: 7, deliveryMode: 'classroom', scheduleStartDate: '2026-09-04', scheduleStartTime: '09:00', scheduleEndTime: '17:00', vacanciesLeft: 9 },
        { id: 'dg-7-1-recurrent', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Recurrent as per IATA DGR function 7.1 (Supervised Assessment)', functionName: 'Preparing Dangerous Goods Consignment (Recurrent)', dayCount: 3, deliveryMode: 'classroom', scheduleStartDate: '2026-09-08', scheduleStartTime: '09:00', scheduleEndTime: '17:00', vacanciesLeft: 3 },
        { id: 'dg-7-2-recurrent', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Recurrent as per IATA DGR function 7.2 (Supervised Assessment)', functionName: 'Processing or Accepting Goods Presented as General Cargo (Recurrent)', dayCount: 1, deliveryMode: 'virtual', scheduleStartDate: '2026-09-10', scheduleStartTime: '14:00', scheduleEndTime: '18:00', vacanciesLeft: 7 },
        { id: 'dg-7-3-recurrent', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Recurrent as per IATA DGR function 7.3 (Supervised Assessment)', functionName: 'Processing or Accepting Dangerous Goods Consignments (Recurrent)', dayCount: 6, deliveryMode: 'classroom', scheduleStartDate: '2026-09-14', scheduleStartTime: '09:00', scheduleEndTime: '17:00', vacanciesLeft: 12 },
        { id: 'dg-7-4-recurrent', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Recurrent as per IATA DGR function 7.4 (Supervised Assessment)', functionName: 'Handling Cargo in a Warehouse, Loading and Unloading Unit Load Devices and Loading and Unloading Aircraft Cargo Compartments (Recurrent)', dayCount: 2, deliveryMode: 'virtual', scheduleStartDate: '2026-09-16', scheduleStartTime: '09:00', scheduleEndTime: '17:00', vacanciesLeft: 5 },
        { id: 'dg-7-5-recurrent', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Recurrent as per IATA DGR function 7.5 (Supervised Assessment)', functionName: 'Security Screening and Control of Dangerous Goods (Recurrent)', dayCount: 4, deliveryMode: 'classroom', scheduleStartDate: '2026-09-18', scheduleStartTime: '09:00', scheduleEndTime: '17:00', vacanciesLeft: 6 },
        { id: 'dg-7-6-recurrent', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Recurrent as per IATA DGR function 7.6 (Supervised Assessment)', functionName: 'Loading, Segregation and Inspection of Dangerous Goods on Aircraft (Recurrent)', dayCount: 3, deliveryMode: 'virtual', scheduleStartDate: '2026-09-21', scheduleStartTime: '09:00', scheduleEndTime: '13:00', vacanciesLeft: 4 }
    ];

    window.saaaTrainingCourses = rawCourses.map(function (course) {
        return Object.assign({}, course, {
            classroomAddress: classroomAddress,
            sessions: buildSessions(
                course.scheduleStartDate,
                course.dayCount,
                course.scheduleStartTime,
                course.scheduleEndTime
            )
        });
    });
})();
