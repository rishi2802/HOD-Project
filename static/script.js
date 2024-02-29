// script.js (JavaScript for calculating total marks)
document.getElementById('activity-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from form fields
    const results = parseInt(document.getElementById('results').value);
    const feedbacks = parseInt(document.getElementById('feedbacks').value);
    const nationalConference = parseInt(document.getElementById('national_conference').value);
    const internationalConference = parseInt(document.getElementById('international_conference').value);
    const nationalJournal = parseInt(document.getElementById('national_journal').value);
    const internationalJournal = parseInt(document.getElementById('international_journal').value);
    const ugProjects = parseInt(document.getElementById('ug_projects').value);
    const pgProjects = parseInt(document.getElementById('pg_projects').value);
    const phdProjects = parseInt(document.getElementById('phd_projects').value);
    const industryProjects = parseInt(document.getElementById('industry_projects').value);
    const consultancy = parseInt(document.getElementById('consultancy').value);
    const organizedEvents = parseInt(document.getElementById('organized_events').value);
    const attendedEvents = parseInt(document.getElementById('attended_events').value);
    const administrativeDuties = document.getElementById('administrative_duties').value;

    // Calculate total marks
    const academicMarks = results + feedbacks;
    const researchMarks = (nationalConference * 2) + (internationalConference * 3) + (nationalJournal * 4) + (internationalJournal * 6);
    const projectGuidanceMarks = (ugProjects * 2) + (pgProjects * 4) + (phdProjects * 6);
    const industryMarks = (industryProjects * 4) + (consultancy * 4);
    const organizedEventsMarks = organizedEvents * 3;
    const attendedEventsMarks = attendedEvents * 4;
    let administrativeMarks;
    switch (administrativeDuties) {
        case 'hod':
        case 'club_incharge':
        case 'lab_incharge':
        case 'time_table_incharge':
        case 'bus_incharge':
        case 'hostel_duty':
        case 'iso_iqac':
            administrativeMarks = 5;
            break;
        default:
            administrativeMarks = 0;
            break;
    }
    const totalMarks = academicMarks + researchMarks + projectGuidanceMarks + industryMarks + organizedEventsMarks + attendedEventsMarks + administrativeMarks;

    // Display total marks
    document.getElementById('total-marks').textContent = `Total Marks: ${totalMarks}`;
});
