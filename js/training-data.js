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
        { id: 'dg-7-1-initial', slug: 'dg-7-1-initial', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Initial as per the IATA Dangerous Goods Training Guidance 7.1 (Supervised assessment)', functionName: 'Preparing Dangerous Goods Consignment', dayCount: 5, deliveryMode: 'classroom', scheduleStartDate: '2026-10-05', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: ['5 - 8 Oct 2026', '5 - 9 Oct 2026', '23 - 26 Nov 2026', '23 - 27 Nov 2026', '7 - 10 Dec 2026', '7 - 11 Dec 2026'], vacanciesLeft: 8, isOpeningSoon: false, bookNowUrl: 'training-book.html?slug=dg-7-1-initial', infoPageSlug: 'transport-of-dangerous-goods-by-air-initial-as-per-the-iata-dangerous-goods-training-guidance-7-1-supervised-assessment' },
        { id: 'dg-7-2-initial', slug: 'dg-7-2-initial', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Initial as per the IATA Dangerous Goods Training Guidance 7.2 (Supervised assessment)', functionName: 'Processing or Accepting Goods Presented as General Cargo', dayCount: 1, deliveryMode: 'virtual', scheduleStartDate: '2026-08-28', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: ['26 Feb 2026', '19 Mar 2026', '23 Apr 2026', '25 May 2026', '25 Jun 2026'], vacanciesLeft: 5, isOpeningSoon: false, bookNowUrl: 'training-book.html?slug=dg-7-2-initial', infoPageSlug: 'transport-of-dangerous-goods-by-air-initial-as-per-the-iata-dangerous-goods-training-guidance-7-2-supervised-assessment' },
        { id: 'dg-7-3-initial', slug: 'dg-7-3-initial', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Initial as per the IATA Dangerous Goods Training Guidance 7.3 (Supervised Assessment)', functionName: 'Processing or Accepting Dangerous Goods Consignments', dayCount: 5, deliveryMode: 'classroom', scheduleStartDate: '2026-09-14', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: ['14 - 17 Sep 2026', '14 - 18 Sep 2026', '12 - 15 Oct 2026', '12 - 16 Oct 2026', '16 - 19 Nov 2026', '16 - 20 Nov 2026', '14 - 17 Dec 2026'], vacanciesLeft: 11, isOpeningSoon: false, bookNowUrl: 'training-book.html?slug=dg-7-3-initial', infoPageSlug: 'transport-of-dangerous-goods-by-air-initial-as-per-the-iata-dangerous-goods-training-guidance-7-3-supervised-assessment' },
        { id: 'dg-7-4-initial', slug: 'dg-7-4-initial', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Initial as per IATA DGR function 7.4 (Supervised Assessment)', functionName: 'Handling Cargo in a Warehouse, Loading and Unloading Unit Load Devices and Loading and Unloading Aircraft Cargo Compartments', dayCount: 1, deliveryMode: 'classroom', scheduleStartDate: '2026-08-28', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: ['28 Aug 2026', '25 Sep 2026', '23 Oct 2026', '6 Nov 2026', '4 Dec 2026'], vacanciesLeft: 6, isOpeningSoon: false, bookNowUrl: 'training-book.html?slug=dg-7-4-initial', infoPageSlug: 'transport-of-dangerous-goods-by-air-initial-as-per-iata-dgr-function-7-4-supervised-assessment' },
        { id: 'dg-7-1-recurrent', slug: 'dg-7-1-recurrent', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Recurrent as per IATA DGR function 7.1 (Supervised Assessment)', functionName: 'Preparing Dangerous Goods Consignment (Recurrent)', dayCount: 3, deliveryMode: 'classroom', scheduleStartDate: '2026-09-28', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: ['24 - 26 Aug 2026', '28 - 30 Sep 2026'], isOpeningSoon: true, bookNowUrl: null, infoPageSlug: 'transport-of-dangerous-goods-by-air-recurrent-as-per-the-iata-dangerous-goods-training-guidance-7-1-supervised-assessment' },
        { id: 'dg-7-2-recurrent', slug: 'dg-7-2-recurrent', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Recurrent as per IATA DGR function 7.2 (Supervised Assessment)', functionName: 'Processing or Accepting Goods Presented as General Cargo (Recurrent)', dayCount: 1, deliveryMode: 'virtual', scheduleStartDate: '2026-09-01', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: [], isOpeningSoon: true, bookNowUrl: null, infoPageSlug: 'transport-of-dangerous-goods-by-air-recurrent-as-per-iata-dgr-function-7-2-supervised-assessment' },
        { id: 'dg-7-3-recurrent', slug: 'dg-7-3-recurrent', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Recurrent as per IATA DGR function 7.3 (Supervised Assessment)', functionName: 'Processing or Accepting Dangerous Goods Consignments (Recurrent)', dayCount: 3, deliveryMode: 'classroom', scheduleStartDate: '2026-09-21', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: ['27 - 29 Jul 2026', '21 - 23 Sep 2026', '19 - 21 Oct 2026', '11 - 13 Nov 2026', '30 Nov - 2 Dec 2026'], vacanciesLeft: 12, isOpeningSoon: false, bookNowUrl: 'training-book.html?slug=dg-7-3-recurrent', infoPageSlug: 'transport-of-dangerous-goods-by-air-recurrent-as-per-iata-dgr-function-7-3-supervised-assessment' },
        { id: 'dg-7-4-recurrent', slug: 'dg-7-4-recurrent', category: 'cbta-dg', title: 'Transport of Dangerous Goods by Air – Recurrent as per IATA DGR function 7.4 (Supervised Assessment)', functionName: 'Handling Cargo in a Warehouse, Loading and Unloading Unit Load Devices and Loading and Unloading Aircraft Cargo Compartments (Recurrent)', dayCount: 1, deliveryMode: 'virtual', scheduleStartDate: '2026-09-01', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: [], isOpeningSoon: true, bookNowUrl: null, infoPageSlug: 'transport-of-dangerous-goods-by-air-recurrent-as-per-iata-dgr-function-7-4-supervised-assessment' },
        { id: 'htdp', slug: 'htdp', category: 'air-cargo', title: 'HazMat Transport Driver Permit (HTDP) Course', functionName: 'HazMat Transport Driver Permit', dayCount: 1, deliveryMode: 'classroom', scheduleStartDate: '2026-08-23', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: ['16 Aug 2026', '23 Aug 2026', '13 Sep 2026', '20 Sep 2026', '27 Sep 2026'], vacanciesLeft: 10, isOpeningSoon: false, bookNowUrl: 'training-book.html?slug=htdp', infoPageSlug: 'hazmat-transport-driver-permit-htdp-course' },
        { id: 'mail-security', slug: 'mail-security', category: 'air-cargo', title: 'MOT-SAAA Air Cargo & Mail Security Course', functionName: 'Air Cargo & Mail Security', dayCount: 2, deliveryMode: 'classroom', scheduleStartDate: '2026-09-17', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: ['17 - 18 Sep 2026'], vacanciesLeft: 8, isOpeningSoon: false, bookNowUrl: 'training-book.html?slug=mail-security', infoPageSlug: 'air-cargo-mail-security-course' },
        { id: 'pharma', slug: 'pharma', category: 'air-cargo', title: 'IATA-SAAA Air Cargo Pharma Overview Training', functionName: 'Air Cargo Pharma Overview', dayCount: 2, deliveryMode: 'classroom', scheduleStartDate: '2026-08-27', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: ['27 - 28 Aug 2026'], vacanciesLeft: 7, isOpeningSoon: false, bookNowUrl: 'training-book.html?slug=pharma', infoPageSlug: 'iata-saaa-air-cargo-pharma' },
        { id: 'elearning', slug: 'elearning', category: 'air-cargo', title: 'SAAA-Airport College e-Learning Collaboration Program', functionName: 'Airport College e-Learning', dayCount: 1, dayCountLabel: 'Self Paced', deliveryMode: 'virtual', scheduleStartDate: '2026-08-18', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: ['To start upon registration'], isOpeningSoon: false, bookNowUrl: 'training-book.html?slug=elearning', infoPageSlug: 'saaa-airport-college-e-learning-collaboration-program' },
        { id: 'affb', slug: 'affb', category: 'air-cargo', title: 'Airfreight Forwarders Basic Course', functionName: 'Airfreight Forwarders Basic', dayCount: 3, deliveryMode: 'classroom', scheduleStartDate: '2026-09-09', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: ['8 - 10 Jul 2026', '12 - 14 Aug 2026', '9 - 11 Sep 2026'], vacanciesLeft: 9, isOpeningSoon: false, bookNowUrl: 'training-book.html?slug=affb', infoPageSlug: 'airfreight-forwarders-basic-course-3' },
        { id: 'incoterms', slug: 'incoterms', category: 'air-cargo', title: 'Incoterms 2020 Training', functionName: 'Incoterms 2020', dayCount: 1, deliveryMode: 'virtual', scheduleStartDate: '2026-09-15', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: ['25 Sep 2025', '1 Oct 2025', '27 Nov 2025', '18 Dec 2025'], vacanciesLeft: 6, isOpeningSoon: false, bookNowUrl: 'training-book.html?slug=incoterms', infoPageSlug: 'incoterms-2020-training' },
        { id: 'uld', slug: 'uld', category: 'air-cargo', title: 'ULD Build-Up Course', functionName: 'ULD Build-Up', dayCount: 1, deliveryMode: 'classroom', scheduleStartDate: '2026-09-12', scheduleStartTime: '09:00', scheduleEndTime: '17:00', scheduleOptions: ['11 Jul 2026'], vacanciesLeft: 5, isOpeningSoon: false, bookNowUrl: 'training-book.html?slug=uld', infoPageSlug: 'uld-build-up-course-information' }
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

    window.saaaTrainingTabs = [
        { id: 'all', label: 'All Courses' },
        { id: 'cbta-dg', label: 'CBTA DG Courses' },
        { id: 'air-cargo', label: 'Air Cargo & Supply Chain' },
        { id: 'others', label: 'Others' }
    ];
})();
